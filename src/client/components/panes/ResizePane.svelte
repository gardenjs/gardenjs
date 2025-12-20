<script>
  let {
    disabled = false,
    maxHeight,
    maxWidth,
    paneHeight,
    paneWidth,
    onSetStageHeight,
    onSetStageWidth,
    children,
  } = $props()

  let resizepane = $state()
  let dragType = ''

  const paneHeightWithUnit = $derived.by(() => {
    if (Number.isInteger(paneHeight) && !disabled) {
      return Math.min(paneHeight, maxHeight) + 'px'
    }
    return maxHeight + 'px'
  })

  const paneWidthWithUnit = $derived.by(() => {
    if (Number.isInteger(paneWidth)) {
      return Math.min(paneWidth, maxWidth) + 'px'
    }
    return maxWidth + 'px'
  })

  const register = (type) => () => {
    dragType = type
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
  }

  const drag = (e) => {
    window.getSelection().removeAllRanges()
    if (dragType.includes('horizontal')) {
      let newHeight = e.pageY - resizepane.offsetTop - 11
      if (newHeight > maxHeight) {
        newHeight = 'full'
      } else {
        newHeight = Math.min(maxHeight, newHeight)
        newHeight = Math.max(50, newHeight)
      }
      onSetStageHeight(newHeight)
    }

    if (dragType.includes('vertical')) {
      let newWidth = e.pageX - resizepane.offsetLeft - 10
      if (newWidth > maxWidth) {
        newWidth = 'full'
      } else {
        newWidth = Math.min(maxWidth, newWidth)
        newWidth = Math.max(50, newWidth)
      }
      onSetStageWidth(newWidth)
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
    {@render children?.()}
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar vertical" class:disabled onmousedown={register('vertical')}>
     <div class="dragbar-icon"></div>
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar horizontal" class:disabled onmousedown={register('horizontal')}>
    <div class="dragbar-icon"></div>
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar corner" class:disabled onmousedown={register('verticalhorizontal')}>
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
    width: 0.25rem;
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
    height: 0.25rem;
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
    height: 0.25rem;
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
