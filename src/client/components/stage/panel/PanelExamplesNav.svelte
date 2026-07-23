<script>
  import ParamsPane from './ParamsPane.svelte'
  import PanelA11y from './PanelA11y.svelte'
  import VerticalSplitPane from './../../panes/VerticalSplitPane.svelte'

  const SIDE_BY_SIDE_MIN_WIDTH = 1680

  let {
    examples = [],
    params,
    values,
    valuesChanged = false,
    onChange,
    onReset,
    selected,
    onSelectExample,
    a11yEnabled = true,
    a11yState = { scanning: false, results: null, error: null },
    onHighlightA11yRule = () => {},
    onClearA11yHighlight = () => {},
    onA11yPaneChange = () => {},
  } = $props()

  let leftWidth = $state('')
  let maxWidth = $state('')
  let rightPane = $state('controls')
  let rightContentEl = $state()
  let rightContentWidth = $state(0)

  const sideBySide = $derived(
    a11yEnabled && rightContentWidth > SIDE_BY_SIDE_MIN_WIDTH
  )

  $effect(() => {
    if (!rightContentEl) return
    const observer = new ResizeObserver((entries) => {
      rightContentWidth = entries[0]?.contentRect.width ?? 0
    })
    observer.observe(rightContentEl)
    rightContentWidth = rightContentEl.getBoundingClientRect().width
    return () => observer.disconnect()
  })
</script>

<VerticalSplitPane
  {leftWidth}
  {maxWidth}
  hideDragBar={false}
  onSetLeftWidth={(newLeftWidth) => (leftWidth = newLeftWidth)}
  onSetMaxWidth={(newMaxWidth) => (maxWidth = newMaxWidth)}
>
  {#snippet left()}
    <ul class="examples">
      {#each examples as example, index (index)}
        <li
          class:active={selected == example}
          class:modified={selected == example && valuesChanged}
        >
          <button onclick={() => onSelectExample(example)}>
            <span class="dot"></span>
            {example}
          </button>
        </li>
      {/each}
    </ul>
  {/snippet}
  {#snippet right()}
    <div class="right_pane">
      {#if a11yEnabled && !sideBySide}
        <div class="right_nav" role="tablist" aria-label="Example tools">
          <button
            type="button"
            role="tab"
            class="right_nav_btn"
            class:active={rightPane === 'controls'}
            aria-selected={rightPane === 'controls'}
            onclick={() => (rightPane = 'controls')}
          >
            <span class="dot"></span>
            Controls
          </button>
          <button
            type="button"
            role="tab"
            class="right_nav_btn"
            class:active={rightPane === 'a11y'}
            aria-selected={rightPane === 'a11y'}
            onclick={() => (rightPane = 'a11y')}
          >
            <span class="dot"></span>
            Accessibility
          </button>
        </div>
      {/if}
      <div
        class="right_content"
        class:side_by_side={sideBySide}
        bind:this={rightContentEl}
      >
        {#if sideBySide || rightPane === 'controls' || !a11yEnabled}
          <div class="right_col">
            <ParamsPane
              {params}
              {values}
              {valuesChanged}
              {onChange}
              {onReset}
            />
          </div>
        {/if}
        {#if a11yEnabled && (sideBySide || rightPane === 'a11y')}
          <div class="right_col" class:right_col_a11y={sideBySide}>
            <PanelA11y
              {a11yState}
              {onHighlightA11yRule}
              {onClearA11yHighlight}
              onActiveChange={onA11yPaneChange}
            />
          </div>
        {/if}
      </div>
    </div>
  {/snippet}
</VerticalSplitPane>

<style>
  .examples {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
  .examples li button,
  .right_nav_btn {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0.5rem 1.25rem;
    box-sizing: border-box;
    min-height: 2.5rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--c-basic-600);
    text-align: left;
    background: none;
  }
  .examples li button {
    padding-left: 1.25rem;
    padding-right: 0.5rem;
    width: 100%;
  }
  .right_nav_btn {
    min-height: calc(2.5rem - 1px);
  }
  .examples li button .dot,
  .right_nav_btn .dot {
    display: block;
    flex-shrink: 0;
    margin: 0 0.5rem 0 0;
    height: 0.375rem;
    width: 0.375rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .examples li.active button .dot,
  .right_nav_btn.active .dot {
    background-color: var(--c-primary);
  }
  .examples li:nth-child(odd) button {
    background-color: var(--c-basic-50);
  }
  .examples li button:hover,
  .examples li button:focus-visible,
  .right_nav_btn:hover,
  .right_nav_btn:focus-visible {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-150);
  }
  .examples li.active button,
  .right_nav_btn.active {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
  }
  .examples li.active.modified button {
    background-color: var(--c-basic-100);
  }
  .examples li.active button:focus-visible {
    background-color: var(--c-basic-150);
  }
  .right_pane {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    height: 100%;
    min-height: 0;
  }
  .right_nav {
    display: flex;
    flex-shrink: 0;
    align-items: stretch;
    min-height: calc(2.5rem - 1px);
    border-bottom: 1px solid var(--c-basic-200);
    background-color: var(--c-basic-0);
  }
  .right_content {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .right_content.side_by_side {
    display: flex;
    flex-direction: row;
    min-width: 0;
  }
  .right_col {
    flex: 1;
    min-width: 0;
    min-height: 0;
    height: 100%;
    overflow: auto;
  }
  .right_col_a11y {
    border-left: 1px solid var(--c-basic-200);
  }
</style>
