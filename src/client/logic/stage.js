import { writable, get, derived } from 'svelte/store'
import { localStore, textOrNumberParser } from './localStore'

export const themes = writable([])
export const stageSizes = writable({
  small: [{ name: 'small', h: 1170, w: 550 }],
  medium: [{ name: 'medium', h: 1080, w: 810 }],
  large: [{ name: 'large', h: 960, w: 1536 }],
})

const fullStageSize = {
  name: 'full',
  h: '100%',
  w: '100%',
}

export const stageStyle = writable('')
export const stageSize = localStore('stageSize', 'full')
export const landscape = localStore(
  'landscape',
  false,
  (value) => value === 'true'
)
export const stageContainerHeight = localStore(
  'stageContainerHeight',
  '',
  textOrNumberParser
)
export const stageContainerWidth = localStore(
  'stageContainerWidth',
  '',
  textOrNumberParser
)
export const stageContainerMaxHeight = localStore(
  'stageContainerMaxHeight',
  '',
  textOrNumberParser
)
export const stageHeight = localStore('stageHeight', 'full', textOrNumberParser)
export const stageWidth = localStore('stageWidth', 'full', textOrNumberParser)

export const stageMaxHeight = derived(
  [stageContainerHeight, stageContainerMaxHeight],
  ([$stageContainerHeight, $stageContainerMaxHeight]) =>
    Math.min($stageContainerHeight, $stageContainerMaxHeight) - 20
)
export const stageMaxWidth = derived(
  stageContainerWidth,
  ($stageContainerWidth) => $stageContainerWidth - 20
)

export const stageRect = writable({})

export const panelExpanded = writable(true)
export const appTheme = localStore('appTheme', 'default')

export const activeTheme = localStore('frameTheme')

export const showInspector = writable(false)
export const showDistanceMeasure = writable(false)
export const showGrid = writable(false)

export const gridSettings = writable({
  size: 16,
  style: 'lined',
  color: '#ddd',
})

export const resetStage = () => {
  stageSize.set('full')
  landscape.set(false)
  stageContainerHeight.set('')
  stageContainerWidth.set('')
  stageContainerMaxHeight.set('')
  stageHeight.set('full')
  stageWidth.set('full')
}

export function setGridSettings({ size, style, color }) {
  gridSettings.set({
    size: size ?? 50,
    style: style ?? 'lined',
    color: color ?? 'grey',
  })
}

let previousPanelHeight = ''

export function setStageSizes(newStageSizes) {
  stageSizes.set(newStageSizes)
  setStagesize(get(stageSize))
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

export function setTheme(themeName) {
  themes.set(
    get(themes).map((theme) => ({ ...theme, active: theme.name === themeName }))
  )
  activeTheme.set(themeName)
  computeStageStyle()
}

export function toggleAppTheme() {
  appTheme.set(get(appTheme) === 'dark' ? 'default' : 'dark')
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

function findStageSize(name) {
  if (name === 'full') {
    return fullStageSize
  }
  const sizes = get(stageSizes)

  const found = [
    ...(sizes.small ?? []),
    ...(sizes.medium ?? []),
    ...(sizes.large ?? []),
  ].find((sts) => sts.name === name)
  return found
    ? { ...found, h: `${found.h}px`, w: `${found.w}px` }
    : fullStageSize
}

function computeStageStyle() {
  const stageBg = getCurrentTheme().stageBg
  const { h: frameheight, w: framewidth } = findStageSize(get(stageSize))
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

export function updateStageRect(newStageRect) {
  stageRect.set(newStageRect)
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

export function toggleShowInspector() {
  showInspector.set(!get(showInspector))
  if (get(showInspector) && get(showDistanceMeasure)) {
    showDistanceMeasure.set(false)
  }
}

export function toggleShowDistanceMeasure() {
  showDistanceMeasure.set(!get(showDistanceMeasure))
  if (get(showInspector) && get(showDistanceMeasure)) {
    showInspector.set(false)
  }
}

export function toggleShowGrid() {
  showGrid.set(!get(showGrid))
}

export function setStagesize(nStageSize) {
  stageSize.set(nStageSize)
  const oldStageSizes = get(stageSizes)
  const newStageSizes = Object.keys(oldStageSizes).reduce((acc, key) => {
    acc[key] = oldStageSizes[key].map((s) => ({
      ...s,
      active: s.name === nStageSize,
    }))
    return acc
  }, {})
  stageSizes.set(newStageSizes)
  computeStageStyle()
}

export function toggleOrientation() {
  landscape.set(!get(landscape))
  computeStageStyle()
}

computeStageStyle()
