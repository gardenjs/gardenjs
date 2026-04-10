<script>
  let startPoint = $state()
  let endPoint = $state()
  let currentPosition = $state()
  let overlay

  let currentEndPoint = $derived(endPoint ?? currentPosition)

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
    />
    <div
      class="label"
      style:top={Math.abs(
        startPoint.y + (currentEndPoint.y - startPoint.y) / 2
      ) +
        6 +
        'px'}
      style:left={Math.abs(
        startPoint.x + (currentEndPoint.x - startPoint.x) / 2
      ) + 'px'}
    >
      {distance}px
    </div>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={currentEndPoint.x}
        y2={currentEndPoint.y}
        stroke="grey"
        stroke-width="2"
      />
    </svg>
  {/if}
  {#if endPoint}
    <div
      class="point"
      style:top={endPoint.y - 3 + 'px'}
      style:left={endPoint.x - 3 + 'px'}
    />
  {/if}
</div>

<style>
  .overlay {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
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
    border-color: grey;
    background-color: grey;
  }
  .label {
    position: absolute;
    text-shadow:
      -2px -2px white,
      -2px 2px white,
      2px -2px white,
      2px 2px white;
  }
</style>
