<script>
  import { onMount, onDestroy } from 'svelte'

  let { contentPane, appTheme } = $props()
  let overlay
  let infobox
  let marginBox
  let paddingBox
  let contentBox

  let margin = $state()
  let padding = $state()
  let content = $state()
  let target = $state()

  function updateOverlay() {
    if (!target) {
      if (overlay?.style) {
        overlay.style.display = 'none'
      }
      return
    }
    overlay.style.display = 'block'
    const rect = target.getBoundingClientRect()
    const style = getComputedStyle(target)

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
    const overlayHeight = rect.height
    const overlayWidth = rect.width
    const overlayBottom = overlayTop + overlayHeight
    const overlayLeft = scrollLeft + rect.left - margin.left
    const overlayRight = overlayLeft + overlayWidth

    // Overlay position + size (margin box)
    overlay.style.top = overlayTop + 'px'
    overlay.style.left = overlayLeft + 'px'
    overlay.style.width = rect.width + 'px'
    overlay.style.height = overlayHeight + 'px'

    // Margin visualization
    marginBox.style.borderWidth = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`

    // Padding visualization (inside content box)
    paddingBox.style.top = margin.top + 'px'
    paddingBox.style.left = margin.left + 'px'
    paddingBox.style.width = rect.width - padding.left - padding.right + 'px'
    paddingBox.style.height = rect.height - padding.top - padding.bottom + 'px'

    paddingBox.style.borderWidth = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`

    contentBox.style.top = margin.top + padding.top + 'px'
    contentBox.style.left = margin.left + padding.left + 'px'
    contentBox.style.width = rect.width - padding.left - padding.right + 'px'
    contentBox.style.height = rect.height - padding.top - padding.bottom + 'px'

    const bodyRect = document.body.getBoundingClientRect()
    const infoboxHeight = 100
    const infoboxWidth = 225
    const bodyHeight = bodyRect.height
    const bodyWidth = bodyRect.width

    const posTopPossible = overlayTop - scrollTop - infoboxHeight > 0
    const posBottomPossible =
      overlayBottom - scrollTop + infoboxHeight < bodyHeight
    const posLeftPossible = overlayLeft - scrollLeft + infoboxWidth < bodyWidth

    if (!infobox) {
      return
    }
    infobox.style.bottom = 'unset'
    if (posBottomPossible) {
      infobox.style.top = overlayBottom + margin.top + margin.bottom + 15 + 'px'
      infobox.classList.add('infobox-bottom')
      infobox.classList.remove('infobox-top')
    } else if (posTopPossible) {
      infobox.style.top = overlayTop - 105 + 'px'
      infobox.classList.add('infobox-top')
      infobox.classList.remove('infobox-bottom')
    } else {
      infobox.style.top = 'unset'
      infobox.style.bottom = -scrollTop + 'px'
      infobox.classList.remove('infobox-top')
      infobox.classList.remove('infobox-bottom')
    }
    if (posLeftPossible) {
      infobox.style.left = overlayLeft + 'px'
      infobox.style.right = 'unset'
      infobox.classList.add('infobox-left')
      infobox.classList.remove('infobox-right')
    } else {
      infobox.style.left = 'unset'
      infobox.style.right = bodyWidth - overlayRight + 'px'
      infobox.classList.add('infobox-right')
      infobox.classList.remove('infobox-left')
    }
  }

  const mouseMoveHandler = (event) => {
    if (
      event.target &&
      event.target !== overlay &&
      !overlay?.contains(event.target)
    ) {
      target = event.target
      updateOverlay()
    }
  }
  const mouseOutHandler = (event) => {
    if (overlay && !overlay.contains(event.relatedTarget)) {
      target = null
      overlay.style.display = 'none'
    }
  }

  onMount(() => {
    if (contentPane) {
      contentPane.addEventListener('mousemove', mouseMoveHandler)
      contentPane.addEventListener('mouseout', mouseOutHandler)
      document.body.addEventListener('scroll', updateOverlay, { passive: true })
    }
  })
  onDestroy(() => {
    contentPane.removeEventListener('mousemove', mouseMoveHandler)
    contentPane.removeEventListener('mouseout', mouseOutHandler)
    document.body.removeEventListener('scroll', updateOverlay)
  })
</script>

<div bind:this={overlay} class="overlay">
  <div class="marginBox" bind:this={marginBox} />
  <div class="paddingBox" bind:this={paddingBox} />
  <div class="contentBox" bind:this={contentBox} />
</div>
{#if padding && margin}
  <div
    class="infobox infobox-left infobox-right infobox-bottom infobox-top"
    class:dark={appTheme === 'dark'}
    bind:this={infobox}
  >
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
        {padding.top}{padding.top !== 0 ? 'px' : ''}
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
  .contentBox {
    position: absolute;
    background: hsla(210, 75%, 50%, 0.45);
    overflow: hidden;
  }
  .marginBox {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-color: hsla(30, 80%, 50%, 0.45);
    border-style: solid;
    overflow: hidden;
    box-sizing: content-box;
  }
  .paddingBox {
    position: absolute;
    border-color: hsla(120, 50%, 70%, 0.45);
    border-style: solid;
    overflow: hidden;
    box-sizing: content-box;
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
    background-color: hsl(185, 100%, 95%);
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
    color: hsl(216, 20%, 10%);
    letter-spacing: 0.5px;
    line-height: 1.6;
    overflow: visible;
  }
  .infobox.dark {
    background-color: hsl(185, 80%, 17%);
    color: hsl(216, 30%, 98%);
  }
  .infobox-bottom.infobox-left::before {
    content: '';
    position: absolute;
    margin-top: -1.25rem;
    width: 1.75rem;
    height: 1.125rem;
    background-color: hsl(185, 100%, 95%);
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    left: 0.375rem;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
  }
  .infobox-bottom.infobox-right::before {
    content: '';
    position: absolute;
    margin-top: -1.25rem;
    width: 1.75rem;
    height: 1.125rem;
    background-color: hsl(185, 100%, 95%);
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    right: 0.375rem;
  }
  .infobox-top.infobox-left::after {
    content: '';
    position: absolute;
    width: 1.75rem;
    height: 1.125rem;
    background-color: hsl(185, 100%, 95%);
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    left: 0.375rem;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }
  .infobox-top.infobox-right::after {
    content: '';
    position: absolute;
    width: 1.75rem;
    height: 1.125rem;
    background-color: hsl(185, 100%, 95%);
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    right: 0.375rem;
  }
  .dark.infobox-bottom.infobox-left::before,
  .dark.infobox-bottom.infobox-right::before,
  .dark.infobox-top.infobox-left::after,
  .dark.infobox-top.infobox-right::after {
    background-color: hsl(185, 80%, 17%);
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
