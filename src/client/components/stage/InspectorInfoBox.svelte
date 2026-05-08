<script>
  let { position, theme, element } = $props()
  const { margin, padding } = element ?? {
    margin: { top: 0, left: 0, right: 0, bottom: 0 },
    padding: { top: 0, left: 0, right: 0, bottom: 0 },
  }
</script>

<div
  class="infobox"
  class:dark={theme === 'dark'}
  class:infobox-left={position?.includes('left')}
  class:infobox-right={position?.includes('right')}
  class:infobox-bottom={position?.includes('bottom')}
  class:infobox-top={position?.includes('top')}
>
  {#if element}
    <div class="info-item">
      <div class="attribute">Width:</div>
      <div class="value">{element.width}px</div>
    </div>
    <div class="info-item">
      <div class="attribute">Height:</div>
      <div class="value">{element.height}px</div>
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
    <div class="info-item">
      <div class="attribute">Role:</div>
      <div class="value">{element.tagName}</div>
    </div>
    <div class="info-item">
      <div class="attribute">Class Name:</div>
      <div class="info-classlist">
        {#each element.classList as clazz, index (index)}
          <div class="value">{clazz}</div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .infobox {
    pointer-events: none;
    padding: 0.5rem;
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
  .info-classlist {
    display: flex;
    flex-direction: column;
  }
</style>
