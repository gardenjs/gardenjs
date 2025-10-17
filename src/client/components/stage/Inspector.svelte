<script>
  import { onMount, onDestroy } from 'svelte'

  let { contentPane } = $props()
  let overlay
  let marginBox
  let paddingBox

  let margin = $state()
  let padding = $state()
  let content = $state()
  let infobox = $state()

  //  let scrollTop = $state()
  //  let scrollLeft = $state()

  function updateOverlay(el) {
    const rect = el.getBoundingClientRect()
    const style = getComputedStyle(el)

    let scrollTop = document.body.scrollTop
    let scrollLeft = document.body.scrollLeft

    content = {
      width: parseFloat(style.width),
      height: parseFloat(style.height),
      background: style.background,
    }

    margin = {
      top: parseFloat(style.marginTop),
      right: parseFloat(style.marginRight),
      bottom: parseFloat(style.marginBottom),
      left: parseFloat(style.marginLeft),
    }

    padding = {
      top: parseFloat(style.paddingTop),
      right: parseFloat(style.paddingRight),
      bottom: parseFloat(style.paddingBottom),
      left: parseFloat(style.paddingLeft),
    }

    const overlayTop = scrollTop + rect.top - margin.top
    const overlayHeight = rect.height + margin.top + margin.bottom
    const overlayBottom = overlayTop + overlayHeight

    // Overlay position + size (margin box)
    overlay.style.display = 'block'
    overlay.style.top = scrollTop + rect.top - margin.top + 'px'
    overlay.style.left = scrollLeft + rect.left - margin.left + 'px'
    overlay.style.width = rect.width + margin.left + margin.right + 'px'
    overlay.style.height = rect.height + margin.top + margin.bottom + 'px'

    // Margin visualization
    marginBox.style.top = 0
    marginBox.style.left = 0
    marginBox.style.width = '100%'
    marginBox.style.height = '100%'

    // Padding visualization (inside content box)
    paddingBox.style.top = margin.top + 'px'
    paddingBox.style.left = margin.left + 'px'
    paddingBox.style.width = rect.width + 'px'
    paddingBox.style.height = rect.height + 'px'

    infobox.style.top =
      overlayBottom + 200 < contentPane.offsetHeight
        ? overlayBottom + 10 + 'px'
        : overlayTop - 200 + 'px'
  }

  const mouseMoveHandler = (event) => {
    if (
      event.target &&
      event.target !== overlay &&
      !overlay?.contains(event.target)
    ) {
      updateOverlay(event.target)
    }
  }
  const mouseOutHandler = (event) => {
    if (overlay && !overlay.contains(event.relatedTarget)) {
      overlay.style.display = 'none'
      //          padding = null
      //          margin = null
    }
  }

  onMount(() => {
    if (contentPane) {
      contentPane.addEventListener('mousemove', mouseMoveHandler)
      contentPane.addEventListener('mouseout', mouseOutHandler)
    }
  })
  onDestroy(() => {
    contentPane.removeEventListener('mousemove', mouseMoveHandler)
    contentPane.removeEventListener('mouseout', mouseOutHandler)
  })
</script>

<div bind:this={overlay} class="overlay">
  <div class="boxes">
    <div class="marginBox" bind:this={marginBox} />
    <div class="paddingBox" bind:this={paddingBox} />
  </div>
</div>
{#if padding && margin}
  <div class="infobox" bind:this={infobox}>
    <div>
      width: {content.width}
    </div>
    <div>
      height: {content.height}
    </div>
    <div>
      background: {content.background}
    </div>
    <div>
      margin: {margin.top}
      {margin.right}
      {margin.bottom}
      {margin.left}
    </div>
    <div>
      padding: {padding.top}
      {padding.right}
      {padding.bottom}
      {padding.left}
    </div>
  </div>
{/if}

<style>
  .overlay {
    display: none;
    position: absolute;
    z-index: 999999;
    pointer-events: none;
    border: 2px solid rgba(0, 150, 255, 0.8);
  }
  .boxes {
    width: 100%;
    height: 100%;
  }
  .marginBox {
    position: absolute;
    background: rgba(255, 165, 0, 0.3);
  }
  .paddingBox {
    position: absolute;
    background: rgba(0, 255, 0, 0.3);
  }
  .infobox {
    margin-top: 10px;
    position: absolute;
    z-index: 999999;
    background-color: gray;
    opacity: 0.8;
    width: 360px;
  }
</style>
