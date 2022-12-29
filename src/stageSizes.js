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
  return landscape 
    ? `width: ${frameheight}; height: ${framewidth}; transition: 0.2s; background: ${stageBg};`
    : `width: ${framewidth}; height: ${frameheight}; transition: 0.2s; background: ${stageBg};`
}
