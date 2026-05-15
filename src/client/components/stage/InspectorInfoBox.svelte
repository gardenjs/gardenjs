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
      <div class="attribute">Size:</div>
      <div class="value">{element.width} x {element.height}</div>
    </div>
    {#if element.gap || element.columnGap || element.rowGap}
      <div class="info-item">
        <div class="attribute">Gap:</div>
        <div class="value">
          {element.gap}
          {element.columnGap}
          {element.rowGap}
        </div>
      </div>
    {/if}
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
    {#if (element.classList?.length ?? 0) > 1}
      <div class="info-item">
        <div class="attribute">Class names:</div>
        <div class="info-classlist value">
          {element.classList.join(' ')}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .infobox {
    position: relative;
    pointer-events: none;
    padding: 0.75rem;
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
    font-size: 0.75rem;
    color: hsl(216, 20%, 10%);
    letter-spacing: 0.5px;
    line-height: 1.6;
    overflow: visible;
    max-width: 500px;
  }
  .infobox-stage {
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
  }
  .infobox.dark {
    background-color: hsl(185, 80%, 17%);
    color: hsl(216, 30%, 98%);
  }
  .infobox.infobox-panel {
    padding: 0.5rem;
    width: 100%;
    min-width: 0;
    max-width: none;
  }
  .infobox_header-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .infobox_primary-class {
    flex: 1;
    min-width: 0;
    margin-bottom: 0;
    font-size: 0.875rem;
    color: hsl(185, 80%, 40%);
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
  .infobox.dark .btn_unpin {
    color: hsl(216, 30%, 96%);
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
  .infobox_primary-class {
    font-weight: 600;
    margin-bottom: 0.375rem;
    overflow-wrap: break-word;
  }
  .info-item {
    display: flex;
    flex-direction: row;
  }
  .attribute {
    width: 8rem;
    font-weight: 600;
  }
  .info-classlist {
    flex: 1;
    min-width: 0;
    overflow-wrap: break-word;
  }
</style>
