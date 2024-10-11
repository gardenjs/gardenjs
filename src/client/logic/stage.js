import { writable, get, derived, readable } from 'svelte/store'

function localStore(
  name,
  defaultValue,
  parseString = (value) => value,
  stringify = (value) => value
) {
  const store = writable(
    parseString(localStorage.getItem(name)) ?? defaultValue
  )
  store.subscribe((value) => {
    localStorage.setItem(name, stringify(value))
  })
  return store
}

export const themes = writable([])
export const stageStyle = writable('')
export const stageSize = localStore('stageSize', 'full')
export const landscape = localStore(
  'landscape',
  false,
  (value) => value === 'true'
)
export const stageContainerHeight = writable('')
export const stageContainerWidth = writable('')
export const stageContainerMaxHeight = writable('')
export const stageHeight = writable('full')
export const stageWidth = writable('full')
export const stageMaxHeight = derived(
  [stageContainerHeight, stageContainerMaxHeight],
  ([$stageContainerHeight, $stageContainerMaxHeight]) =>
    Math.min($stageContainerHeight, $stageContainerMaxHeight) - 20
)
export const stageMaxWidth = derived(
  stageContainerWidth,
  ($stageContainerWidth) => $stageContainerWidth - 20
)

export const panelExpanded = writable(true)
export const appTheme = localStore('appTheme', 'default')

export const activeTheme = localStore('frameTheme')

export const desktopSidebarExpanded = writable(true)
export const mobileSidebarExpanded = writable(false)

let previousPanelHeight = ''

const sizes = {
  small: {
    frameheight: '1170px',
    framewidth: '550px',
  },
  medium: {
    frameheight: '1080px',
    framewidth: '810px',
  },
  large: {
    frameheight: '960px',
    framewidth: '1536px',
  },
  full: {
    frameheight: '100%',
    framewidth: '100%',
  },
}

export function setThemes(newThemes) {
  if (!get(activeTheme)) {
    activeTheme.set(
      newThemes?.find((theme) => theme.active)?.name ?? newThemes[0].name
    )
  }

  themes.set(
    newThemes?.map((theme) => ({
      ...theme,
      active: theme.name === get(activeTheme),
    }))
  )
  computeStageStyle()
}

export function selectTheme(themeName) {
  themes.set(
    get(themes).map((theme) => ({ ...theme, active: theme.name === themeName }))
  )
  activeTheme.set(themeName)
  computeStageStyle()
}

export function updateAppTheme(newTheme) {
  appTheme.set(newTheme)
}

export function getCurrentTheme() {
  if (get(themes) && get(themes).length > 0) {
    return (
      get(themes).find((theme) => theme.name === get(activeTheme)) ??
      get(themes)[0]
    )
  }
  return { stageBg: 'white' }
}

function computeStageStyle() {
  const stageBg = getCurrentTheme().stageBg
  const { frameheight, framewidth } = sizes[get(stageSize)]
  const size = get(landscape)
    ? `width: ${frameheight}; height: ${framewidth}`
    : `width: ${framewidth}; height: ${frameheight}`
  const background = `background-color: ${stageBg}`
  const transition = 'transition: 0s'

  stageStyle.set(`${size}; ${background}; ${transition};`)
}

export function updateStageContainerHeight(newHeight) {
  stageContainerHeight.set(newHeight)
  updateExpandPanel()
}

export function updateStageContainerMaxHeight(newHeight) {
  const maxHeight = newHeight - 9 // 9px = trackbar + margin-bottom
  stageContainerMaxHeight.set(maxHeight)
  updateExpandPanel()
}

export function updateStageContainerWidth(newWidth) {
  stageContainerWidth.set(newWidth)
}

export function updateStageHeight(newHeight) {
  if (!Number.isInteger(newHeight)) {
    stageHeight.set(newHeight)
  } else {
    stageHeight.set(Math.max(50, newHeight))
  }
}

export function updateStageWidth(newWidth) {
  if (!Number.isInteger(newWidth)) {
    stageWidth.set(newWidth)
  } else {
    stageWidth.set(Math.max(50, newWidth))
  }
}

function updateExpandPanel() {
  if (
    Number.isInteger(get(stageContainerHeight)) &&
    Number.isInteger(get(stageContainerMaxHeight))
  ) {
    panelExpanded.set(get(stageContainerHeight) < get(stageContainerMaxHeight))
  }
}

export function toggleExpandPanel() {
  if (get(panelExpanded)) {
    previousPanelHeight = get(stageContainerHeight)
    // @ts-ignore
    stageContainerHeight.set(get(stageContainerMaxHeight))
  } else {
    if (
      !Number.isInteger(previousPanelHeight) ||
      (Number.isInteger(previousPanelHeight) &&
        // @ts-ignore
        get(stageContainerMaxHeight) - previousPanelHeight < 50)
    ) {
      // @ts-ignore
      previousPanelHeight = Math.round(get(stageContainerMaxHeight) * 0.7)
    }
    stageContainerHeight.set(previousPanelHeight)
  }
  panelExpanded.set(!get(panelExpanded))
}

computeStageStyle()

export function toggleExpandSidebar() {
  if (get(mobileNav)) {
    mobileSidebarExpanded.set(!get(mobileSidebarExpanded))
  } else {
    desktopSidebarExpanded.set(!get(desktopSidebarExpanded))
  }
}

export const mobileNav = readable(window.innerWidth < 840, (set) => {
  // Funktion zum Aktualisieren der Fensterbreite
  const updateWidth = () => {
    set(window.innerWidth < 840)
    mobileSidebarExpanded.set(false)
  }

  // Event-Listener für das Resize-Event hinzufügen
  window.addEventListener('resize', updateWidth)

  // Cleanup-Funktion, um den Event-Listener zu entfernen, wenn der Store nicht mehr verwendet wird
  return () => {
    window.removeEventListener('resize', updateWidth)
  }
})

export const sidebarExpanded = derived(
  [desktopSidebarExpanded, mobileSidebarExpanded, mobileNav],
  ([$desktopSidebarExpanded, $mobileSidebarExpanded, $mobileNav]) => {
    return $mobileNav ? $mobileSidebarExpanded : $desktopSidebarExpanded
  }
)

export function handleSelectionChanged() {
  if (get(mobileNav)) {
    mobileSidebarExpanded.set(false)
  }
}
