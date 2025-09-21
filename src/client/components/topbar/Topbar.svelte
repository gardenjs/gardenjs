<script>
  import { run } from 'svelte/legacy'

  import OptionalDropdown from './OptionalDropdown.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  /**
   * @typedef {Object} Props
   * @property {boolean} [sidebarExpanded]
   * @property {string} [appTheme]
   * @property {boolean} [landscape]
   * @property {string} [stageSize]
   * @property {any} [stageSizes]
   * @property {any} [themes]
   * @property {any} stageRect
   * @property {any} stageMaxHeight
   * @property {any} stageMaxWidth
   * @property {any} node
   */

  /** @type {Props} */
  let {
    sidebarExpanded = true,
    appTheme = 'default',
    landscape = false,
    stageSize = 'full',
    stageSizes = {},
    themes = [],
    stageRect,
    stageMaxHeight,
    stageMaxWidth,
    showInspector,
    node,
  } = $props()

  let dark = $state(false)

  let stageContainerWidth = $state(),
    stageContainerHeight = $state()

  run(() => {
    let { width, height } = stageRect
    stageContainerWidth = Math.round(width)
    stageContainerHeight = Math.round(height)
  })

  run(() => {
    dark = appTheme === 'dark'
    if (appTheme === 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    else document.documentElement.setAttribute('data-theme', 'light')
  })

  function toggleExpandSidebar() {
    dispatch('out', { toggleExpandSidebar: true })
  }

  function toggleBookmark() {
    dispatch('out', { toggleBookmark: node })
  }

  function toggleShowInspector() {
    dispatch('out', { toggleShowInspector: true })
  }

  function toggleDarkmode() {
    const theme = appTheme === 'dark' ? 'default' : 'dark'
    dispatch('out', {
      updateAppTheme: theme,
    })
  }

  function dispatchStageSizeChange(stageSize) {
    dispatch('out', {
      stageSize,
    })
  }

  function toggleOrientation() {
    dispatch('out', {
      landscape: !landscape,
    })
  }

  function openInTab() {
    dispatch('out', {
      openInTab: true,
    })
  }

  function handleThemeChange(selectTheme) {
    dispatch('out', {
      selectTheme,
    })
  }

  function handleSetContainerWidth(evt) {
    dispatch('out', {
      stageWidth: Number.parseInt(evt.target.value),
    })
  }

  function handleSetContainerHeight(evt) {
    dispatch('out', {
      stageHeight: Number.parseInt(evt.target.value),
    })
  }
</script>

<!-- prettier-ignore -->
<div class="topbar">
  <div class="topbar_container">
    <div class="topbar_nav">
      <button class="topbar_btn is-first-btn" onclick={toggleExpandSidebar} title={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}>
        <span class="is-hidden">{sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}</span>
        {#if sidebarExpanded}
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18m7-6l-3-3 3-3" /></svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18m5-12l3 3-3 3" /></svg>
        {/if}
      </button>
      {#if node}
      <button class="topbar_btn bookmark_btn" onclick={toggleBookmark}>
        <span class="is-hidden">{node.bookmark ? 'Remove from bookmarks' : 'Add to bookmarks'}</span>
        {#if node.bookmark}
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        {:else }
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        {/if}
      </button>
      {/if}
    </div>
    <div class="topbar_nav">
      <div class="stagesize-nav">
        {#if stageSizes.small?.length > 0}
          <OptionalDropdown options={stageSizes.small} handleButtonClick={dispatchStageSizeChange }>
            {#snippet buttonSnippet({onClick})}
            <button class="dropdown_btn topbar_btn" class:active={stageSizes.small.some(s => s.active)} title="Small" onclick={onClick}>
          <span class="is-hidden">Resize viewport to small</span>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
          <span class="dot"></span>
  </button>
  {/snippet}
        </OptionalDropdown>
        {/if}
        {#if stageSizes.medium?.length > 0}
          <OptionalDropdown options={stageSizes.medium} handleButtonClick={dispatchStageSizeChange} >
            {#snippet buttonSnippet({onClick})}
            <button class="dropdown_btn topbar_btn" class:active={stageSizes.medium.some(s => s.active)} title="Medium" onclick={onClick}>
          <span class="is-hidden">Resize viewport to medium</span>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
          <span class="dot"></span>
  </button>
  {/snippet}
        </OptionalDropdown>
        {/if}
        {#if stageSizes.large?.length > 0}
          <OptionalDropdown options={stageSizes.large} handleButtonClick={dispatchStageSizeChange}>
            {#snippet buttonSnippet({onClick})}
            <button class="dropdown_btn topbar_btn" class:active={stageSizes.large.some(s => s.active)} title="Large" onclick={onClick}>

          <span class="is-hidden">Resize viewport to large</span>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" ry="2" /><path d="M2 20h20" /></svg>
          <span class="dot"></span>
  </button>
  {/snippet}
        </OptionalDropdown>
        {/if}
        <button title="Full" class:active={stageSize === 'full'} onclick={() => dispatchStageSizeChange('full')}>
          <span class="is-hidden">Resize viewport to full</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8m-4-4v4" /></svg>
          <span class="dot"></span>
        </button>
        <button title={landscape ? 'Portrait mode' : 'Landscape mode'} onclick={toggleOrientation}>
          <span class="is-hidden">Reverse the aspect ratio to {landscape ? 'portrait mode' : 'landscape mode'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="12" height="20" x="6" y="2" rx="2" /><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
        </button>
      </div>
      <div class="stagesize-value">
        <input class="stagesize-input" type="number" disabled={stageSize !== 'full'} value={stageContainerWidth} onchange={handleSetContainerWidth}  min="50" max={stageMaxWidth}/>
        <div class="stagesize-value-multi_sign">&#47;</div>
        <input class="stagesize-input" type="number" disabled={stageSize !== 'full'} value={stageContainerHeight} onchange={handleSetContainerHeight} min="50" max={stageMaxHeight}/>
      </div>
      <button class="topbar_btn show-m-p_btn" class:active={showInspector === true} title="Visualise margins and paddings" onclick="{toggleShowInspector}">
        <span class="is-hidden">Visualise margins and paddings</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="show-margins-paddings" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15v-3.014M16 15v-3.014M20 6H4m16 2V4M4 8V4m4 11v-3.014"/><rect x="3" y="12" width="18" height="7" rx="1"/></svg>
        <span class="dot"></span>
      </button>
      <button class="topbar_btn openexternal_btn" title="Open component in new tab" onclick={openInTab}>
        <span class="is-hidden">Open component in new tab</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="open-new-tab-icon" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" /></svg>
      </button>
      {#if themes.length > 1}
        <OptionalDropdown options={themes} dropright={true} handleButtonClick={handleThemeChange}>
          {#snippet buttonSnippet()}
  <button class="dropdown_btn topbar_btn" title="Switch component theme" >
        <span class="is-hidden">Open menu for selecting themes</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
  </button>
  {/snippet}
      </OptionalDropdown> 
      {/if}
      <button class="topbar_btn is-last-btn" onclick={toggleDarkmode} title={dark ? 'Light mode' : 'Dark mode'}>
        <span class="is-hidden">{dark ? 'Light mode' : 'Dark mode'}</span>
        {#if dark}
          <svg xmlns="http://www.w3.org/2000/svg" class="mode-icon" width="24" viewBox="0 0 24 24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="mode-icon" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.364 6.364 0 009 9 9 9 0 11-9-9z" /></svg>
        {/if}
      </button>
    </div>
  </div>
</div>

<style>
  .topbar {
    --h-topbar: 2.25rem;
    margin: 0.375rem 0;
    width: 100%;
    height: var(--h-topbar);
    background-color: var(--c-topbar-bg);
    border-radius: 0.625rem;
  }
  .topbar_container {
    display: flex;
    justify-content: space-between;
    padding: 1px;
    width: 100%;
    height: 100%;
    padding: 0;
    z-index: 999999;
  }
  .topbar_nav {
    display: flex;
    align-items: center;
  }

  /* buttons */
  .topbar_btn {
    display: flex;
    align-items: center;
    padding: 0 0.375rem;
    height: var(--h-topbar);
    background: none;
  }
  .topbar_btn:hover,
  .topbar_btn:focus-visible {
    background-color: var(--c-basic-100);
  }
  .is-hidden {
    position: absolute !important;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
  }
  .topbar_btn svg {
    height: 1.125rem;
    color: var(--c-basic-700);
  }
  .topbar_btn:hover svg,
  .topbar_btn:focus-visible svg {
    color: var(--c-primary);
  }
  .is-first-btn {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .is-last-btn {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  /* remove btns on small screens */
  @media (max-height: 499px) {
    .bookmark_btn {
      display: none;
    }
  }
  @media (max-width: 499px) {
    .bookmark_btn,
    .openexternal_btn {
      display: none;
    }
  }

  /* stage size */
  .stagesize-value {
    display: none;
  }
  @media (min-width: 640px) {
    .stagesize-value {
      display: inline-flex;
      align-items: center;
      padding: 0 1rem;
      font-size: 0.75rem;
    }
    .stagesize-input {
      padding: 0.25rem 0.375rem;
      width: 42px;
      font-size: 0.75rem;
      font-family:
        ui-monospace,
        Menlo,
        Monaco,
        'Cascadia Mono',
        'Segoe UI Mono',
        'Roboto Mono',
        'Oxygen Mono',
        'Ubuntu Monospace',
        'Source Code Pro',
        'Fira Mono',
        'Droid Sans Mono',
        Courier New,
        'monospace';
      color: var(--c-basic-600);
      text-align: right;
      background-color: transparent;
      border: 1px solid var(--c-primary);
      border-radius: 0.125rem;
    }
    /* same styles as the input in the sidebar: */
    .stagesize-input:focus-visible {
      background-color: var(--c-primary-bg);
    }
    .stagesize-input:disabled {
      border-color: transparent;
    }
    .stagesize-value-multi_sign {
      margin: 0 0.25rem;
      color: var(--c-basic-700);
    }
  }

  /* stagesize nav */
  .stagesize-nav {
    display: none;
  }
  @media (min-width: 1280px) {
    .stagesize-nav {
      position: relative;
      display: inline-flex;
      background-color: var(--c-basic-100);
    }
    .stagesize-nav button {
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-self: center;
      height: var(--h-topbar);
      margin: 0;
      padding: 0 0.25rem;
      background: none;
      overflow: hidden;
    }
    .stagesize-nav button:hover,
    .stagesize-nav button:focus-visible {
      background-color: var(--c-basic-150);
    }
    .stagesize-nav svg {
      height: 1.125rem;
      color: var(--c-basic-700);
      transition: 0.2s;
    }
    .stagesize-nav button:hover svg,
    .stagesize-nav button:focus-visible svg,
    .stagesize-nav button.active svg {
      color: var(--c-primary);
    }
    .stagesize-nav svg.landscape {
      transform: rotate(90deg);
      transition: 0.2s;
    }
    .stagesize-nav .dot {
      display: block;
      position: absolute;
      left: 50%;
      bottom: 0.125rem;
      transform: translateX(-50%);
      height: 0.313rem;
      width: 0.313rem;
      background-color: transparent;
      border-radius: 50%;
    }
    .stagesize-nav button.active {
      background-color: var(--c-primary-bg);
    }
    .stagesize-nav button.active .dot {
      background-color: var(--c-primary);
    }
  }
  button.topbar_btn.active {
    background-color: var(--c-primary-bg);
  }
  button.topbar_btn.active .dot {
    background-color: var(--c-primary);
  }
</style>
