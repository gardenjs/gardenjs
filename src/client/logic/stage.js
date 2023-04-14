import {writable, get} from 'svelte/store'

export const themes = writable([])
export const stageStyle = writable({})
export const stageSize = writable('full')
export const landscape = writable(false) 
let activeTheme


export function setThemes(newThemes) {
  themes.set(newThemes)
}

export function selectTheme(themeName) {
  themes.set(get(themes).map(theme => ({ ...theme, active: theme.name === themeName })))
  activeTheme = get(themes).find((theme) => theme.active)
  stageStyle.set(computeStageStyle())
}

export function updateStage(newStage) {
  stageSize.set(newStage.stageSize)
  landscape.set(newStage.landscape)
  stageStyle.set(computeStageStyle())
}

const sizes = {
  small: {
    frameheight: '1170px',
    framewidth: '550px'
  },
  medium: {
    frameheight: '1080px',
    framewidth: '810px'
  },
  large: {
    frameheight: '960px',
    framewidth: '1536px'
  },
  full: {
    frameheight: '100%',
    framewidth: '100%'
  }
}

function computeStageStyle() {
  const stageBg = activeTheme?.stageBg || 'white'
  const {frameheight, framewidth} = sizes[get(stageSize)]
  const size = get(landscape) ? `width: ${frameheight}; height: ${framewidth}` : `width: ${framewidth}; height: ${frameheight}`
  const padding = get(stageSize) === 'full' ? 'padding: 1rem' : 'padding: 0'
  const background = `background-color: ${stageBg}`
  const transition = 'transition: 0.2s'
 
  return `${size}; ${padding}; ${background}; ${transition};`
}
