import {writable, get} from 'svelte/store'

export const themes = writable([])
export const stageStyle = writable('')
export const stageSize = writable('full')
export const landscape = writable(false) 
let activeTheme

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

export function setThemes(newThemes) {
  themes.set(newThemes)
}

export function selectTheme(themeName) {
  themes.set(get(themes).map(theme => ({ ...theme, active: theme.name === themeName })))
  activeTheme = get(themes).find((theme) => theme.active)
  computeStageStyle()
}

export function updateStage(newStage) {
  stageSize.set(newStage.stageSize)
  landscape.set(newStage.landscape)
  computeStageStyle()
}

function computeStageStyle() {
  const stageBg = activeTheme?.stageBg || 'white'
  const {frameheight, framewidth} = sizes[get(stageSize)]
  const size = get(landscape) ? `width: ${frameheight}; height: ${framewidth}` : `width: ${framewidth}; height: ${frameheight}`
  const background = `background-color: ${stageBg}`
  const transition = 'transition: 0.2s'
 
  stageStyle.set(`${size}; ${background}; ${transition};`)
}

computeStageStyle()

