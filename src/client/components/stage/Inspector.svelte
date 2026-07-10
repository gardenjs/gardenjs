<script>
  import { onMount, onDestroy } from 'svelte'
  import GapMask from './GapMask.svelte'
  import InspectorInfoBox from './InspectorInfoBox.svelte'

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
  let hasGaps = $state(false)
  let childElements = $state([])

  let overlayTop = $state()
  let overlayLeft = $state()
  let overlayHeight = $state()
  let overlayWidth = $state()
  let contentBoxTop = $state()
  let contentBoxLeft = $state()
  let contentBoxWidth = $state()
  let contentBoxHeight = $state()
  let scrollTop = $state()
  let scrollLeft = $state()

  let infoboxPosition = $state()

  function updateOverlay() {
    if (!target) {
      if (infobox?.style) {
        infobox.style.display = 'none'
      }
      if (overlay?.style) {
        overlay.style.display = 'none'
      }
      margin = null
      padding = null
      content = null
      return
    }
    overlay.style.display = 'block'
    const rect = target.getBoundingClientRect()
    const style = getComputedStyle(target)

    scrollTop = document.body.scrollTop
    scrollLeft = document.body.scrollLeft

    hasGaps =
      (style.display === 'grid' || style.display === 'flex') &&
      target.children.length > 0

    const tagName = target.tagName
    const id = target.id
    const classList = Array.from(target.classList)

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

    content = {
      tagName,
      id,
      classList,
      width: parseFloat(style.width),
      height: parseFloat(style.height),
      background: style.backgroundColor,
      gap: parseFloat(style.gap) || 0,
      rowGap: parseFloat(style.rowGap) || 0,
      columnGap: parseFloat(style.columnGap) || 0,
      margin,
      padding,
    }

    overlayTop = scrollTop + rect.top - margin.top
    overlayHeight = rect.height + margin.top + margin.bottom
    overlayWidth = rect.width + margin.left + margin.right
    const overlayBottom = overlayTop + overlayHeight
    overlayLeft = scrollLeft + rect.left - margin.left
    const overlayRight = overlayLeft + overlayWidth

    // Overlay position + size (margin box)
    overlay.style.top = overlayTop + 'px'
    overlay.style.left = overlayLeft + 'px'
    overlay.style.width = overlayWidth + 'px'
    overlay.style.height = overlayHeight + 'px'

    // Margin visualization
    marginBox.style.borderWidth = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`

    // Padding visualization (inside content box)
    paddingBox.style.top = margin.top + 'px'
    paddingBox.style.left = margin.left + 'px'
    paddingBox.style.width = rect.width + 'px'
    paddingBox.style.height = rect.height + 'px'

    paddingBox.style.borderWidth = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`

    contentBoxTop = margin.top + padding.top
    contentBoxLeft = margin.left + padding.left
    contentBoxWidth = rect.width - padding.left - padding.right
    contentBoxHeight = rect.height - padding.top - padding.bottom

    if (hasGaps) {
      updateGaps(target, scrollTop, scrollLeft)
    } else if (contentBox) {
      contentBox.style.top = contentBoxTop + 'px'
      contentBox.style.left = contentBoxLeft + 'px'
      contentBox.style.width = contentBoxWidth + 'px'
      contentBox.style.height = contentBoxHeight + 'px'
    }

    updateInfoBox(
      overlayTop,
      overlayBottom,
      scrollTop,
      overlayLeft,
      scrollLeft,
      overlayRight
    )
  }

  function updateGaps(element, scrollTop, scrollLeft) {
    childElements = Array.from(element.children).map((child) => {
      const { marginTop, marginLeft, marginRight, marginBottom } =
        getComputedStyle(child)
      const rect = child.getBoundingClientRect()
      return {
        y:
          scrollTop +
          rect.top -
          overlayTop -
          margin.top -
          padding.top -
          parseFloat(marginTop),
        x:
          scrollLeft +
          rect.left -
          overlayLeft -
          margin.left -
          padding.left -
          parseFloat(marginLeft),
        width: rect.width + parseFloat(marginLeft) + parseFloat(marginRight),
        height: rect.height + parseFloat(marginTop) + parseFloat(marginBottom),
      }
    })
  }

  function updateInfoBox(
    overlayTop,
    overlayBottom,
    scrollTop,
    overlayLeft,
    overlayRight,
    scrollLeft
  ) {
    if (!infobox) {
      return
    }
    const bodyRect = document.body.getBoundingClientRect()
    const infoboxHeight =
      130 + (hasGaps ? 20 : 0) + content.classList.length * 20
    const infoboxWidth = 225
    const bodyHeight = bodyRect.height
    const bodyWidth = bodyRect.width

    const posTopPossible = overlayTop - scrollTop - infoboxHeight > 0
    const posBottomPossible =
      overlayBottom - scrollTop + infoboxHeight < bodyHeight
    const posLeftPossible = overlayLeft - scrollLeft + infoboxWidth < bodyWidth

    infobox.style.bottom = 'unset'
    infoboxPosition = undefined
    if (posBottomPossible) {
      infobox.style.top = overlayBottom + 8 + 'px'
      infoboxPosition = 'bottom'
    } else if (posTopPossible) {
      infobox.style.top = overlayTop + 5 - infoboxHeight + 'px'
      infoboxPosition = 'top'
    } else {
      infobox.style.top = 'unset'
      infobox.style.bottom = -scrollTop + 'px'
      infoboxPosition = 'center'
    }
    if (posLeftPossible) {
      infobox.style.left = overlayLeft + 'px'
      infobox.style.right = 'unset'
      infoboxPosition += 'left'
    } else {
      infobox.style.left = 'unset'
      infobox.style.right = bodyWidth - overlayRight + 'px'
      infoboxPosition += 'right'
    }
    infobox.style.display = 'block'
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
      margin = null
      padding = null
      content = null
      target = null
      overlay.style.display = 'none'
      infobox.style.display = 'none'
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
  <div class="borderBox"></div>
  <div class="marginBox" bind:this={marginBox}></div>
  <div class="paddingBox" bind:this={paddingBox}></div>
  {#if hasGaps}
    <GapMask
      top={margin?.top + padding?.top}
      left={margin?.left + padding?.left}
      width={contentBoxWidth}
      height={contentBoxHeight}
      {childElements}
    />
  {:else}
    <div class="contentBox" bind:this={contentBox}></div>
  {/if}
</div>
<div bind:this={infobox} class="infobox">
  <InspectorInfoBox
    position={infoboxPosition}
    element={content}
    theme={appTheme}
    variant="stage"
  />
</div>

<style>
  .overlay {
    display: none;
    position: absolute;
    z-index: 999999;
    overflow: hidden;
    pointer-events: none;
    box-sizing: border-box;
  }
  .borderBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed lightgray;
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
    box-sizing: border-box;
  }
  .paddingBox {
    position: absolute;
    border-color: hsla(120, 50%, 70%, 0.45);
    border-style: solid;
    overflow: hidden;
    box-sizing: border-box;
  }
  .infobox {
    display: none;
    pointer-events: none;
    position: absolute;
    z-index: 999999;
  }
</style>
