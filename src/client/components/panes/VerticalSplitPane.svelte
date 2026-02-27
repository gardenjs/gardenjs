<script>
  let {
    leftWidth = $bindable(),
    maxWidth,
    left,
    right,
    onSetMaxWidth,
    onSetLeftWidth,
  } = $props()
  let element = $state()
  let dragging = $state(false)

  let init = $state(false)

  $effect(() => {
    if (element && !init) {
      init = true
      if (leftWidth && maxWidth) {
        return
      }
      const elementWidth = element.offsetWidth
      onSetMaxWidth(elementWidth - 100)
      onSetLeftWidth(Math.round(elementWidth * 0.2))
    }
  })

  const leftWidthWithUnit = $derived.by(() => {
    if (Number.isInteger(leftWidth) && Number.isInteger(maxWidth)) {
      return maxWidth < leftWidth ? maxWidth + 'px' : leftWidth + 'px'
    }
    return undefined
  })

  $effect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        if (element) {
          onSetMaxWidth(element.offsetWidth - 100)
        }
      })
    })
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  })

  function startDrag(e) {
    e.currentTarget.setPointerCapture(e.pointerId)
    document.body.style.userSelect = 'none'
    dragging = true
  }

  const drag = (e) => {
    if (e.buttons !== 1) return
    const newWidth = Math.min(maxWidth, leftWidth + e.movementX)
    leftWidth = Math.max(100, newWidth)
    onSetLeftWidth(leftWidth)
  }

  function stopDrag(e) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    document.body.style.userSelect = ''
    dragging = false
  }
</script>

<div class="container" bind:this={element}>
  <div class="left" style="width: {leftWidthWithUnit};">
    {@render left?.()}
  </div>
  <!-- eslint-disable-next-line -->
  <div
    class="dragbar"
    class:dragging
    onpointerdown={startDrag}
    onpointerup={stopDrag}
    onpointermove={drag}
  ></div>
  {@render right?.()}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    overflow-x: auto;
  }
  .left {
    flex-grow: 0;
    flex-shrink: 0;
    border-right: 0;
    border-radius: 0.625rem 0.625rem 0 0;
    overflow: auto;
  }
  .dragbar {
    flex-grow: 0;
    flex-shrink: 0;
    width: 0.188rem;
    background-color: var(--c-primary);
    cursor: col-resize;
    z-index: 10;
  }
  .dragging,
  .dragbar:hover {
    background-color: var(--c-primary);
    transform: scaleX(2);
  }
</style>
