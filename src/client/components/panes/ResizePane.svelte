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
    class="dragbar vertical"
    class:disabled
    on:mousedown={register('vertical')}
  >
    <svg width="6" height="24" xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M1 1v22M5 1v22"
        fill="none"
        stroke-linecap="round"
        stroke="#000"
        stroke-width="2"
      /></svg
    >
  </div>
  <!-- eslint-disable-next-line -->
  <div
    class="dragbar horizontal"
    class:disabled
    on:mousedown={register('horizontal')}
  >
    <svg width="24" height="6" xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M1 1h22M1 5h22"
        fill="none"
        stroke-linecap="round"
        stroke="#000"
        stroke-width="2"
      /></svg
    >
  </div>
  <!-- eslint-disable-next-line -->
  <div
    class="dragbar corner"
    class:disabled
    on:mousedown={register('verticalhorizontal')}
  >
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M12 4l-8 8m9-3l-4 4"
        fill="none"
        stroke-linecap="round"
        stroke="#000"
        stroke-width="2"
      /></svg
    >
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template: min-content 1rem / min-content 1rem;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .dragbar {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--c-dragbar-bg);
    z-index: 10;
  }
  .dragbar:hover {
    background-color: var(--c-dragbar-bg-hover);
  }
  .dragbar svg path {
    stroke: var(--c-basic-700);
  }
  .vertical {
    cursor: ew-resize;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
    border-radius: 0 0.625rem 0 0;
  }
  .horizontal {
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
    cursor: ns-resize;
  }
  .corner {
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    cursor: nwse-resize;
  }
  .dragbar.disabled {
    display: none;
  }
  .grid.disabled {
    display: flex;
    justify-content: center;
  }
</style>
