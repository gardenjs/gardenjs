<script>
  import GapMask from './GapMask.svelte'
  import InspectorInfoBox from './InspectorInfoBox.svelte'

  let { box, margin, padding, content, gaps, info, appTheme, fixed } = $props()

  let overlay
  let infoBox
  let marginBox
  let paddingBox
  let contentBox

  $effect(() => {
    if (!box || !margin || !padding) {
      reset()
      return
    }
    updateOverlay(box)
    updateMargin(margin)
    updatePadding(padding)
    if (contentBox) {
      updateContent(box, margin, padding)
    }
    if (!fixed && info && content) {
      updateInfoBox(info)
    }
  })

  function reset() {}

  function updateOverlay(box) {
    overlay.style.top = box.top + 'px'
    overlay.style.left = box.left + 'px'
    overlay.style.width = box.right - box.left + 'px'
    overlay.style.height = box.bottom - box.top + 'px'
  }

  function updateMargin(margin) {
    marginBox.style.borderWidth = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
  }
  function updatePadding(padding) {
    // Padding visualization (inside content box)
    paddingBox.style.top = margin.top + 'px'
    paddingBox.style.left = margin.left + 'px'
    paddingBox.style.width = padding.width + 'px'
    paddingBox.style.height = padding.height + 'px'

    paddingBox.style.borderWidth = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
  }

  function updateContent(box, margin, padding) {
    contentBox.style.top = margin.top + padding.top + 'px'
    contentBox.style.left = margin.left + padding.left + 'px'
    contentBox.style.width =
      box.width -
      margin.left -
      margin.right -
      padding.left -
      padding.right +
      'px'
    contentBox.style.height =
      box.height -
      margin.top -
      margin.bottom -
      padding.top -
      padding.bottom +
      'px'
  }

  function updateInfoBox(info) {
    infoBox.style.top = info.style.top
    infoBox.style.right = info.style.right
    infoBox.style.bottom = info.style.bottom
    infoBox.style.left = info.style.left
  }
</script>

{#if box}
  <div bind:this={overlay} class="overlay">
    <div class="borderBox"></div>
    <div class="marginBox" bind:this={marginBox}></div>
    <div class="paddingBox" bind:this={paddingBox}></div>
    {#if gaps?.length > 0}
      <GapMask
        top={margin?.top + padding?.top}
        left={margin?.left + padding?.left}
        width={box.width -
          margin.left -
          margin.right -
          padding.left -
          padding.right}
        height={box.height -
          margin.top -
          margin.bottom -
          padding.top -
          padding.bottom}
        {gaps}
      />
    {:else}
      <div class="contentBox" bind:this={contentBox}></div>
    {/if}
  </div>
  {#if !fixed}
    <div bind:this={infoBox} class="infoBox">
      <InspectorInfoBox
        position={info?.position}
        element={content}
        theme={appTheme}
        variant="stage"
      />
    </div>
  {/if}
{/if}

<style>
  .overlay {
    display: block;
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
  .infoBox {
    display: block;
    pointer-events: none;
    position: absolute;
    z-index: 999999;
  }
</style>
