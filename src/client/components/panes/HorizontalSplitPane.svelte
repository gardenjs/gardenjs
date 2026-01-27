<script>
  import { onMount, onDestroy } from 'svelte'
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

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(() => {
      onSetMaxHeight(element.offsetHeight)
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
    const newHeight = Math.min(maxHeight, e.pageY - element.offsetTop - 7)
    topHeight = newHeight
    onSetTopHeight(topHeight)
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)

    onSetTopHeight(topHeight)
    dragging = false
  }
</script>

<div class="container" bind:this={element}>
  <div class="top" style="height: {topHeightWithUnit};">
    {@render top?.()}
  </div>
  <!-- eslint-disable-next-line -->
  <div class="dragbar" class:dragging onmousedown={register}></div>
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
