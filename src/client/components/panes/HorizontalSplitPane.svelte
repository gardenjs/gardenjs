<script>
  let {
    topHeight = $bindable(),
    maxHeight,
    top,
    bottom,
    onSetMaxHeight,
    onSetMaxWidth,
    onSetTopHeight,
  } = $props()
  let element = $state()
  let dragging = $state(false)

  let init = $state(false)

  $effect(() => {
    if (element && !init) {
      init = true
      if (topHeight && maxHeight) {
        return
      }
      const elementHeight = element.offsetHeight
      onSetMaxHeight(elementHeight)
      onSetTopHeight(Math.round(elementHeight * 0.7))
    }
  })

  const topHeightWithUnit = $derived.by(() => {
    if (Number.isInteger(topHeight) && Number.isInteger(maxHeight)) {
      return maxHeight < topHeight ? maxHeight + 'px' : topHeight + 'px'
    }
    return undefined
  })

  $effect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        if (element) {
          onSetMaxHeight(element.offsetHeight)
          onSetMaxWidth(element.offsetWidth)
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
    const newHeight = Math.min(maxHeight, topHeight + e.movementY)
    topHeight = Math.max(100, newHeight)
    onSetTopHeight(topHeight)
  }

  function stopDrag(e) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    document.body.style.userSelect = ''
    dragging = false
  }
</script>

<div class="container" bind:this={element}>
  <div class="top" style="height: {topHeightWithUnit};">
    {@render top?.()}
  </div>
  <!-- eslint-disable-next-line -->
  <div
    class="dragbar"
    class:dragging
    onpointerdown={startDrag}
    onpointerup={stopDrag}
    onpointermove={drag}
  ></div>
  {@render bottom?.()}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .top {
    flex-grow: 0;
    flex-shrink: 0;
    border-bottom: 0;
    border-radius: 0.625rem 0.625rem 0 0;
    overflow: hidden;
  }
  .dragbar {
    flex-grow: 0;
    flex-shrink: 0;
    height: 0.188rem;
    background-color: var(--c-primary);
    cursor: row-resize;
    z-index: 10;
  }
  .dragging,
  .dragbar:hover {
    background-color: var(--c-primary);
    transform: scaleY(2);
  }
</style>
