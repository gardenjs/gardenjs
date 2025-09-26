<script>
  import { onMount, onDestroy } from 'svelte'

  let { contentPane, margin } = $props()
  let grid
  let resizeObserver

  function updateGrid() {
    const style = getComputedStyle(contentPane)
    const bodyStyle = getComputedStyle(document.body)
    console.log('DEBUG', 'width', style.width, bodyStyle.width)
    console.log('DEBUG', 'height', style.height, bodyStyle.height)
    grid.style.width =
      Math.max(parseFloat(style.width), parseFloat(bodyStyle.width)) + 'px'
    grid.style.height =
      Math.max(parseFloat(style.height), parseFloat(bodyStyle.height)) + 'px'
    grid.style.margin = margin
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

<div bind:this={grid} class="grid"></div>

<style>
  .grid {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, grey 1px, transparent 1px),
      linear-gradient(to bottom, grey 1px, transparent 1px);
  }
</style>
