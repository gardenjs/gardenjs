<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  const dispatch = createEventDispatcher()

  export let topHeight
  export let maxHeight
  $: topHeightWithUnit = Number.isInteger(topHeight)
    ? topHeight + 'px'
    : topHeight
  let element
  let dragging = false

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      dispatch('out', { maxHeight: element.offsetHeight })
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
    <slot name="top" />
  </div>
  <div class="dragbar" class:dragging on:mousedown={register}></div>
  <slot name="bottom" />
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
    border: 1px solid var(--c-basic-400);
    border-bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
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
