import { writable, get } from 'svelte/store'

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
export const stageHeight = writable('')
export const stageWidth = writable('')
export const stageMaxHeight = writable('')
export const panelExpanded = writable(true)
export const appTheme = localStore('appTheme', 'default')

export const activeTheme = localStore('frameTheme')

let previousPanelHeight = '65vh'

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

export function updateStage(newStage) {
  stageSize.set(newStage.stageSize)
  landscape.set(newStage.landscape)
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

export function updateStageHeight(newHeight) {
  if (Number.isInteger(newHeight)) {
    panelExpanded.set(newHeight < get(stageMaxHeight))
  }
  stageHeight.set(newHeight)
}

export function updateStageMaxHeight(newHeight) {
  stageMaxHeight.set(newHeight - 20)
}

export function updateStageWidth(newWidth) {
  stageWidth.set(newWidth - 20)
}

export function toggleExpandPanel() {
  if (get(panelExpanded)) {
    previousPanelHeight = get(stageHeight)
    // @ts-ignore
    stageHeight.set(get(stageMaxHeight))
  } else {
    stageHeight.set(previousPanelHeight)
  }
  panelExpanded.set(!get(panelExpanded))
}

computeStageStyle()
