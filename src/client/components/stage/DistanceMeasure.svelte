<script>
  import { onMount, onDestroy } from 'svelte'
  let { activeTheme } = $props()
  let overlay
  let startPoint = $state()
  let endPoint = $state()
  let currentPosition = $state()
  let currentEndPoint = $derived(endPoint ?? currentPosition)
  let scrollPos = $state({ x: 0, y: 0 })

  function onScroll() {
    const scrollTop = document.body.scrollTop
    const scrollLeft = document.body.scrollLeft
    const delta = { x: scrollPos.x - scrollLeft, y: scrollPos.y - scrollTop }
    scrollPos = { x: scrollLeft, y: scrollTop }
    overlay.style.top = scrollTop + 'px'
    overlay.style.left = scrollLeft + 'px'
    startPoint = updatePoint(startPoint, delta)
    endPoint = updatePoint(endPoint, delta)
    currentPosition = updatePoint(currentPosition, delta)
  }

  function updatePoint(point, delta) {
    return point ? { x: point.x + delta.x, y: point.y + delta.y } : point
  }

  const handleClick = (evt) => {
    const newPoint = { x: evt.pageX, y: evt.pageY }
    if (!startPoint || endPoint) {
      startPoint = newPoint
      endPoint = undefined
    } else {
      endPoint = newPoint
    }
  }

  const updateCurrentPosition = (e) => {
    currentPosition = { x: e.pageX, y: e.pageY }
  }

  const distance = $derived(
    startPoint && (endPoint || currentPosition)
      ? Math.floor(
          Math.sqrt(
            Math.pow(currentEndPoint.x - startPoint.x, 2) +
              Math.pow(currentEndPoint.y - startPoint.y, 2)
          )
        )
      : undefined
  )

  onMount(() => {
    document.body.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onDestroy(() => {
    document.body.removeEventListener('scroll', onScroll)
  })
</script>

<div
  bind:this={overlay}
  class="overlay"
  onclick={handleClick}
  onmousemove={updateCurrentPosition}
>
  {#if startPoint}
    <div
      class="point"
      style:top={startPoint.y - 3 + 'px'}
      style:left={startPoint.x - 3 + 'px'}
      style:background-color={activeTheme.color}
      style:border-color={activeTheme.color}
    />
    <div
      class="label"
      style:top={startPoint.y +
        6 +
        (currentEndPoint.y - startPoint.y) / 2 +
        'px'}
      style:left={startPoint.x + (currentEndPoint.x - startPoint.x) / 2 + 'px'}
      style:color={activeTheme.color}
      style:background-color={activeTheme.stageBg}
    >
      {distance}px
    </div>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={currentEndPoint.x}
        y2={currentEndPoint.y}
        stroke={activeTheme.color}
        stroke-width="2"
      />
    </svg>
  {/if}
  {#if endPoint}
    <div
      class="point"
      style:top={endPoint.y - 3 + 'px'}
      style:left={endPoint.x - 3 + 'px'}
      style:background-color={activeTheme.color}
      style:border-color={activeTheme.color}
    />
  {/if}
</div>

<style>
  .overlay {
    background-color: transparent;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 999999;
    overflow: hidden;
    box-sizing: border-box;
    cursor: crosshair;
  }
  .point {
    position: absolute;
    width: 6px;
    height: 6px;
    border: 2px solid;
    border-radius: 3px;
  }
  .label {
    position: absolute;
    padding: 0 0.375rem;
  }
  .label::selection {
    background-color: transparent;
    color: inherit;
  }
</style>
