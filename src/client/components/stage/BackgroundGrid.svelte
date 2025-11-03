<script>
  import { onMount, onDestroy } from 'svelte'

  let { contentPane, appMargin, gridSettings } = $props()
  let grid
  let resizeObserver

  function updateGrid() {
    const appStyle = document
      .getElementById('garden_app')
      .getBoundingClientRect()
    const bodyStyle = document.body.getBoundingClientRect()
    const appHeight = Math.max(appStyle.height, bodyStyle.height)
    const appWidth = Math.max(appStyle.width, bodyStyle.width)
    grid.style.margin = appMargin
    const size = gridSettings.size
    const color = gridSettings.color
    grid.style.backgroundSize = `${size}px ${size}px`
    const computedGridStyle = getComputedStyle(grid)
    grid.style.width = `calc(${appWidth}px - ${computedGridStyle.marginLeft} - ${computedGridStyle.marginRight})`
    grid.style.height = `calc(${appHeight}px - ${computedGridStyle.marginTop} - ${computedGridStyle.marginBottom})`
    if (gridSettings.style === 'lined') {
      grid.style.backgroundImage = `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`
    }
    if (gridSettings.style === 'dotted') {
      grid.style.top = `-${size / 2}px`
      grid.style.left = `-${size / 2}px`
      grid.style.backgroundImage = `radial-gradient(circle, ${color} 1px, transparent 1px)`
    }
  }

  onMount(() => {
    if (contentPane) {
      updateGrid()
      resizeObserver = new ResizeObserver(() => {
        updateGrid()
      })
      resizeObserver.observe(contentPane)
      resizeObserver.observe(document.body)
    }
  })

  onDestroy(() => {
    resizeObserver.disconnect()
  })
</script>

<div
  bind:this={grid}
  class={{
    grid: true,
    lined: gridSettings.style === 'lined',
    dotted: gridSettings.style === 'dotted',
  }}
></div>

<style>
  .grid {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    background-size: 16px 16;
  }
  .lined {
    background-image:
      linear-gradient(to right, grey 1px, transparent 1px),
      linear-gradient(to bottom, grey 1px, transparent 1px);
  }
  .dotted {
    top: -8px;
    left: -8px;
    background-image: radial-gradient(circle, grey 1px, transparent 1px);
  }
</style>
