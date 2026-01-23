<script>
  import { onMount, onDestroy } from 'svelte'
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
      onSetMaxWidth(elementWidth)
      onSetLeftWidth(Math.round(elementWidth * 0.2))
    }
  })

  const leftPos = $derived.by(() => {
    return element ? element.getBoundingClientRect().left + window.scrollX : 0
  })

  const leftWidthWithUnit = $derived.by(() => {
    if (Number.isInteger(leftWidth) && Number.isInteger(maxWidth)) {
      return maxWidth < leftWidth ? maxWidth + 'px' : leftWidth + 'px'
    }
    return undefined
  })

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(() => {
      onSetMaxWidth(element.offsetWidth)
    })
  })

  onMount(() => {
    resizeObserver.observe(element)
  })

  onDestroy(() => {
    resizeObserver.disconnect()
  })

  function register() {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', unregister)
    dragging = true
  }

  const drag = (e) => {
    window.getSelection().removeAllRanges()
    console.log(
      'DEBUG',
      'epagex',
      e.pageX,
      'offsetleft',
      element.offsetLeft,
      leftPos
    )
    const newWidth = Math.min(maxWidth, e.pageX - leftPos)
    leftWidth = newWidth
    onSetLeftWidth(leftWidth)
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)

    onSetLeftWidth(leftWidth)
    dragging = false
  }
</script>

<div class="container" bind:this={element}>
  <div class="left" style="width: {leftWidthWithUnit};">
    {@render left?.()}
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar" class:dragging onmousedown={register}></div>
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
    overflow: hidden;
    padding: 0 20px;
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
