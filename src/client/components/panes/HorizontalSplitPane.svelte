<script>
  import { run } from 'svelte/legacy'

  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  const dispatch = createEventDispatcher()

  /**
   * @typedef {Object} Props
   * @property {any} topHeight
   * @property {any} maxHeight
   * @property {import('svelte').Snippet} [top]
   * @property {import('svelte').Snippet} [bottom]
   */

  /** @type {Props} */
  let { topHeight = $bindable(), maxHeight, top, bottom } = $props()
  let element = $state()
  let dragging = $state(false)

  let init = $state(false)

  run(() => {
    if (element && !init) {
      init = true
      const elementHeight = element.offsetHeight
      dispatch('out', {
        maxHeight: elementHeight,
        topHeight: Math.round(elementHeight * 0.7),
      })
    }
  })

  let topHeightWithUnit = $state()
  run(() => {
    if (Number.isInteger(topHeight) && Number.isInteger(maxHeight)) {
      topHeightWithUnit =
        maxHeight < topHeight ? maxHeight + 'px' : topHeight + 'px'
    }
  })

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(() => {
      dispatch('out', {
        maxHeight: element.offsetHeight,
        maxWidth: element.offsetWidth,
      })
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
    dispatch('out', { topHeight: topHeight })
  }

  function unregister() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', unregister)

    dispatch('out', { topHeight: topHeight })
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
