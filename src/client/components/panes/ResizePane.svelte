<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let disabled = false
  export let maxHeight
  export let maxWidth
  let paneHeight = maxHeight
  let paneWidth = maxWidth
  let previousMaxHeight
  let previousMaxWidth

  let grid
  let pane
  let dragType = ''

  $: {
    if (disabled) {
      paneHeight = maxHeight
      paneWidth = maxWidth
    }
  }

  let paneHeightWithUnit
  $: {
    if (Number.isInteger(paneHeight)) {
      paneHeightWithUnit = Math.min(paneHeight, maxHeight) + 'px'
    }
  }
  $: {
    if (previousMaxHeight !== maxHeight) {
      paneHeightWithUnit = maxHeight + 'px'
      previousMaxHeight = maxHeight
    }
  }
  let paneWidthWithUnit
  $: {
    if (Number.isInteger(paneWidth)) {
      paneWidthWithUnit = Math.min(paneWidth, maxWidth) + 'px'
    }
  }
  $: {
    if (previousMaxWidth !== maxWidth) {
      paneWidthWithUnit = maxWidth + 'px'
      previousMaxWidth = maxWidth
    }
  }

  const register = (type) => () => {
    dragType = type
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
  }

  const drag = (e) => {
    window.getSelection().removeAllRanges()
    if (dragType.includes('horizontal')) {
      const newHeight = Math.min(maxHeight, e.pageY - pane.offsetTop)
      paneHeight = newHeight
    }

    if (dragType.includes('vertical')) {
      const newWidth = Math.min(maxWidth, e.pageX - pane.offsetLeft)
      paneWidth = newWidth
    }
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)

    dispatch('out', { paneHeight: paneHeight })
    dispatch('out', { paneWidth: paneWidth })
  }
</script>

<div class="grid" class:disabled bind:this={grid}>
  <div
    class="pane"
    class:disabled
    style:width={disabled ? undefined : paneWidthWithUnit}
    style:height={disabled ? undefined : paneHeightWithUnit}
    bind:this={pane}
  >
    <slot />
  </div>
  <!-- eslint-disable-next-line -->
  <div
    class="vertical dragbar"
    class:disabled
    on:mousedown={register('vertical')}
  ></div>
  <!-- eslint-disable-next-line -->
  <div
    class="horizontal dragbar"
    class:disabled
    on:mousedown={register('horizontal')}
  ></div>
  <!-- eslint-disable-next-line -->
  <div
    class="corner dragbar"
    class:disabled
    on:mousedown={register('verticalhorizontal')}
  ></div>
</div>

<style>
  .grid {
    display: grid;
    grid-template: min-content 8px / min-content 8px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .dragbar {
    flex-grow: 0;
    flex-shrink: 0;
    height: 0.188rem;
    background-color: grey;
    z-index: 10;
    height: 100%;
    width: 100%;
  }
  .vertical {
    cursor: ew-resize;
  }
  .horizontal {
    cursor: ns-resize;
  }
  .corner {
    cursor: nwse-resize;
  }

  .dragbar:hover {
    background-color: dimgray;
  }
  .dragbar.disabled {
    display: none;
  }
  .grid.disabled {
    display: flex;
    justify-content: center;
  }
</style>
