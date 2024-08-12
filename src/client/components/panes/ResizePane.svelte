<script>
  import { createEventDispatcher } from 'svelte'
  export let disabled = false
  export let maxHeight
  export let maxWidth
  export let paneHeight
  export let paneWidth
  const dispatch = createEventDispatcher()

  let resizepane
  let dragType = ''

  let paneHeightWithUnit
  $: {
    if (Number.isInteger(paneHeight) && !disabled) {
      paneHeightWithUnit = Math.min(paneHeight, maxHeight) + 'px'
    } else {
      paneHeightWithUnit = maxHeight + 'px'
    }
  }
  let paneWidthWithUnit
  $: {
    if (Number.isInteger(paneWidth)) {
      paneWidthWithUnit = Math.min(paneWidth, maxWidth) + 'px'
    } else {
      paneWidthWithUnit = maxWidth + 'px'
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
      let newHeight = e.pageY - resizepane.offsetTop
      if (newHeight > maxHeight) {
        newHeight = 'full'
      } else {
        newHeight = Math.min(maxHeight, newHeight)
        newHeight = Math.max(50, newHeight)
      }
      dispatch('out', { stageHeight: newHeight })
    }

    if (dragType.includes('vertical')) {
      let newWidth = e.pageX - resizepane.offsetLeft
      if (newWidth > maxWidth) {
        newWidth = 'full'
      } else {
        newWidth = Math.min(maxWidth, newWidth)
        newWidth = Math.max(50, newWidth)
      }
      dispatch('out', { stageWidth: newWidth })
    }
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)
  }
</script>

<!-- prettier-ignore -->
<div class="resizepane-container" class:disabled>
  <div class="resizepane" class:disabled style:width={disabled ? undefined : paneWidthWithUnit} style:height={disabled ? undefined : paneHeightWithUnit} bind:this={resizepane}>
    <slot />
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar vertical" class:disabled on:mousedown={register('vertical')}>
     <div class="dragbar-icon"></div>
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar horizontal" class:disabled on:mousedown={register('horizontal')}>
    <div class="dragbar-icon"></div>
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar corner" class:disabled on:mousedown={register('verticalhorizontal')}>
    <div class="dragbar-icon"></div>
  </div>
</div>

<style>
  .resizepane-container {
    display: grid;
    grid-template: min-content 1.25rem / min-content 1.25rem;
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
  .vertical {
    width: 1.25rem;
    border-top: 1px solid var(--c-dragbar-bg);
    border-right: 1px solid var(--c-dragbar-bg);
    border-radius: 0 0.625rem 0 0;
    cursor: ew-resize;
  }
  .vertical .dragbar-icon {
    width: 5px;
    height: 60%;
    max-height: 3.75rem;
    background-color: var(--c-dragbar-icon);
    border-radius: 1rem;
  }
  .horizontal {
    height: 1.25rem;
    border-bottom: 1px solid var(--c-dragbar-bg);
    border-left: 1px solid var(--c-dragbar-bg);
    cursor: ns-resize;
  }
  .horizontal .dragbar-icon {
    width: 60%;
    max-width: 3.75rem;
    height: 5px;
    background-color: var(--c-dragbar-icon);
    border-radius: 1rem;
  }
  .corner {
    width: 1.25rem;
    height: 1.25rem;
    border-right: 1px solid var(--c-dragbar-bg);
    border-bottom: 1px solid var(--c-dragbar-bg);
    cursor: nwse-resize;
  }
  .corner .dragbar-icon {
    width: 1rem;
    height: 5px;
    transform: rotate(-45deg);
    background-color: var(--c-dragbar-icon);
    border-radius: 1rem;
  }
  .dragbar.disabled {
    display: none;
  }
  .resizepane-container.disabled {
    display: flex;
    justify-content: center;
  }
</style>
