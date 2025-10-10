<script>
  import { onMount, onDestroy } from 'svelte'

  let { contentPane, margin, gridSettings } = $props()
  let grid
  let resizeObserver

  function updateGrid() {
    grid.style.margin = margin
    const size = gridSettings.size
    grid.style.backgroundSize = `${size}px ${size}px`
    if (gridSettings.style === 'dotted') {
      grid.style.top = `-${size / 2}px`
      grid.style.left = `-${size / 2}px`
    }
  }

  onMount(() => {
    if (contentPane) {
      updateGrid()
      resizeObserver = new ResizeObserver(() => {
        updateGrid()
      })
      resizeObserver.observe(contentPane)
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
    right: 0;
    bottom: 0;
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
