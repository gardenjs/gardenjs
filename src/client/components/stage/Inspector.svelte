<script>
  import { onMount, onDestroy } from 'svelte'

  let { contentPane } = $props()
  let overlay
  let marginBox
  let paddingBox
  let contentBox

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
      background: style.backgroundColor,

      gap: parseFloat(style.gap),
      gapUnit: style.gap.replace(/[0-9.]/g, ''),
      rowGap: parseFloat(style.rowGap),
      columnGap: parseFloat(style.columnGap),
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

    contentBox.style.top = margin.top + padding.top + 'px'
    contentBox.style.left = margin.left + padding.left + 'px'
    contentBox.style.width = rect.width + -padding.left - padding.right + 'px'
    contentBox.style.height = rect.height + -padding.top - padding.bottom + 'px'

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
    <div class="contentBox" bind:this={contentBox} />
  </div>
</div>
{#if padding && margin}
  <div class="infobox" bind:this={infobox}>
    <div class="info-item">
      <div class="attribute">Width:</div>
      <div class="value">{content.width}px</div>
    </div>
    <div class="info-item">
      <div class="attribute">Height:</div>
      <div class="value">{content.height}px</div>
    </div>
    <!-- <div class="info-item">
      <div class="attribute">Gap:</div>
      <div class="value">{content.gap} {content.gapUnit} {content.columnGap} {content.rowGap}</div>
    </div> -->
    <div class="info-item">
      <div class="attribute">Margin:</div>
      <div class="value">
        {margin.top}{margin.top !== 0 ? 'px' : ''}
        {margin.right}{margin.right !== 0 ? 'px' : ''}
        {margin.bottom}{margin.bottom !== 0 ? 'px' : ''}
        {margin.left}{margin.left !== 0 ? 'px' : ''}
      </div>
    </div>
    <div class="info-item">
      <div class="attribute">Padding:</div>
      <div class="value">
        {padding.top}{margin.top !== 0 ? 'px' : ''}
        {padding.right}{padding.right !== 0 ? 'px' : ''}
        {padding.bottom}{padding.bottom !== 0 ? 'px' : ''}
        {padding.left}{padding.left !== 0 ? 'px' : ''}
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    display: none;
    position: absolute;
    z-index: 999999;
    pointer-events: none;
  }
  .boxes {
    width: 100%;
    height: 100%;
  }
  .contentBox {
    position: absolute;
    background: hsla(210, 75%, 50%, 0.45);
    overflow: hidden;
  }
  .marginBox {
    position: absolute;
    background: hsla(30, 80%, 50%, 0.45);
    overflow: hidden;
  }
  .paddingBox {
    position: absolute;
    background: hsla(120, 50%, 70%, 0.45);
    overflow: hidden;
  }
  /* .gapBox {
    position: absolute;
    background: hsla(256, 55%, 55%, 0.45);
    overflow: hidden;
  } */
  .infobox {
    padding: 0.5rem;
    position: absolute;
    z-index: 999999;
    background-color: #fff;
    border-radius: 0.5rem;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    font-variation-settings: normal;
    font-family:
      system-ui,
      -apple-system,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji';
    font-size: 0.75rem;
    color: #000;
    letter-spacing: 0.5px;
    line-height: 1.6;
    overflow: visible;
  }
  .infobox::after {
    content: '';
    position: absolute;
    width: 1.75rem;
    height: 1.125rem;
    background: #fff;
    clip-path: polygon(0 0, 100% 0, 50% 100%); /* pointy at the bottom */
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    left: 1rem;
  }
  .info-item {
    display: flex;
    flex-direction: row;
  }
  .attribute {
    width: 8rem;
    /* font-weight: 600; */
  }
</style>
