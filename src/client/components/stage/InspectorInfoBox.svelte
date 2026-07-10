<script>
  let {
    position,
    theme,
    element,
    variant = 'stage',
    showUnpin = false,
  } = $props()

  const emptyBox = { top: 0, right: 0, bottom: 0, left: 0 }
  const margin = $derived(element?.margin ?? emptyBox)
  const padding = $derived(element?.padding ?? emptyBox)
  const tagNameLower = $derived((element?.tagName ?? '').toLowerCase())
  const primaryLabel = $derived(
    element?.id
      ? `${tagNameLower}#${element.id}`
      : element?.classList?.length
        ? `${tagNameLower}.${element.classList[0]}`
        : null
  )

  /** @param {number | string | null | undefined} value */
  function roundPx(value) {
    return Math.round((Number(value) || 0) * 100) / 100
  }

  /** @param {number | string | null | undefined} value */
  function formatPx(value) {
    const n = roundPx(value)
    return n === 0 ? '0' : `${n}px`
  }

  /** @param {{ top?: number, right?: number, bottom?: number, left?: number }} box */
  function formatBoxShorthand(box) {
    const top = roundPx(box.top)
    const right = roundPx(box.right)
    const bottom = roundPx(box.bottom)
    const left = roundPx(box.left)
    /** @param {number} n */
    const unit = (n) => (n === 0 ? '0' : `${n}px`)

    if (top === right && right === bottom && bottom === left) {
      return unit(top)
    }
    if (top === bottom && left === right) {
      return `${unit(top)} ${unit(left)}`
    }
    if (left === right) {
      return `${unit(top)} ${unit(left)} ${unit(bottom)}`
    }
    return `${unit(top)} ${unit(right)} ${unit(bottom)} ${unit(left)}`
  }
</script>

<div
  class="infobox"
  class:infobox-stage={variant === 'stage'}
  class:infobox-panel={variant === 'panel'}
  class:dark={theme === 'dark'}
  class:infobox-left={position?.includes('left')}
  class:infobox-right={position?.includes('right')}
  class:infobox-bottom={position?.includes('bottom')}
  class:infobox-top={position?.includes('top')}
>
  {#if showUnpin || primaryLabel}
    <div
      class="infobox_header-row"
      class:infobox_header-row--with-primary={!!primaryLabel}
    >
      {#if primaryLabel}
        <div class="infobox_primary-class">{primaryLabel}</div>
      {/if}
      {#if showUnpin}
        <button class="btn_unpin" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <title>Unpin element from inspector</title>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      {/if}
    </div>
  {/if}
  {#if element}
    <div class="info-item">
      <div class="attribute">Size</div>
      <div class="value">
        {formatPx(element.width)} x {formatPx(element.height)}
      </div>
    </div>
    {#if element.gap || element.columnGap || element.rowGap}
      <div class="info-item">
        <div class="attribute">Gap</div>
        <div class="value">
          {formatPx(element.gap)}
          {formatPx(element.columnGap)}
          {formatPx(element.rowGap)}
        </div>
      </div>
    {/if}
    <div class="info-item">
      <div class="attribute">Margin</div>
      <div class="value">{formatBoxShorthand(margin)}</div>
    </div>
    <div class="info-item">
      <div class="attribute">Padding</div>
      <div class="value">{formatBoxShorthand(padding)}</div>
    </div>
    {#if (element.classList?.length ?? 0) > 1}
      <div class="info-item info-item--classnames">
        <div class="attribute">Class names</div>
        <div class="info-classlist value">
          {#each element.classList as className (className)}
            <span class="info-classname">{className}</span>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .infobox {
    position: relative;
    pointer-events: none;
    padding: 0.5rem;
    background-color: hsl(185, 100%, 95%);
    border-radius: 0.5rem;
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
    font-size: 0.813rem;
    color: hsl(216, 20%, 10%);
    letter-spacing: 0.5px;
    line-height: 1.6;
    overflow: visible;
  }
  .infobox.dark {
    background-color: hsl(185, 80%, 17%);
    color: hsl(216, 30%, 98%);
  }
  .infobox-stage {
    width: 18rem;
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
  }
  .infobox.infobox-panel {
    width: 100%;
  }
  .infobox_header-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .infobox_primary-class {
    flex: 1;
    min-width: 0;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    color: hsl(185, 80%, 40%);
    font-weight: 600;
    overflow-wrap: break-word;
  }
  .infobox.dark .infobox_primary-class {
    color: hsl(185, 80%, 70%);
  }
  .infobox_header-row:not(.infobox_header-row--with-primary) .btn_unpin {
    margin-left: auto;
  }
  .btn_unpin {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    padding: 0;
    width: 1rem;
    height: 1rem;
    pointer-events: auto;
    cursor: pointer;
    color: hsl(216, 20%, 15%);
  }
  .btn_unpin:hover,
  .btn_unpin:focus-visible {
    color: hsl(185, 80%, 40%);
  }
  .infobox.dark .btn_unpin {
    color: hsl(216, 30%, 96%);
  }
  .infobox.dark .btn_unpin:hover,
  .infobox.dark .btn_unpin:focus-visible {
    color: hsl(185, 80%, 70%);
  }
  .infobox-bottom.infobox-left::before {
    content: '';
    position: absolute;
    margin-top: -1.25rem;
    width: 1.75rem;
    height: 1.125rem;
    background-color: hsl(185, 100%, 95%);
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.05))
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
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.05))
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
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.05))
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
  .infobox-panel.infobox-bottom.infobox-left::before,
  .infobox-panel.infobox-bottom.infobox-right::before,
  .infobox-panel.infobox-top.infobox-left::after,
  .infobox-panel.infobox-top.infobox-right::after {
    filter: none;
  }
  .info-item {
    display: flex;
    flex-direction: row;
  }
  .info-item--classnames {
    flex-direction: column;
    align-items: stretch;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid hsl(185, 80%, 40%);
  }
  .info-item--classnames .attribute {
    width: auto;
    font-size: 0.75rem;
    word-spacing: -0.25rem;
  }
  .info-item--classnames .value {
    flex: none;
    text-align: left;
  }
  .attribute {
    width: 6rem;
    font-size: 0.75rem;
    font-weight: 600;
    word-spacing: -0.25rem;
  }
  .value {
    flex: 1;
    min-width: 0;
    text-align: right;
  }
  .info-classlist {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    overflow-wrap: break-word;
  }
</style>
