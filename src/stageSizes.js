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

export function computeStageStyle({stageSize= 'full', landscape = false, stageBg = 'white'}) {
  const {frameheight, framewidth} = sizes[stageSize]
  const size = landscape ? `width: ${frameheight}; height: ${framewidth}` : `width: ${framewidth}; height: ${frameheight}`
  const padding = stageSize === 'full' ? 'padding: 1rem' : 'padding: 0'
  const background = `background: ${stageBg}`
  const transition = 'transition: 0.2s'
 
  return `${size};${padding};${background}${transition};`
}
