<script>
  import { createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()

  export let active = true
  export let dark = false
  export let landscape = false
  export let stageSize = 'full'
  export let themes = []
  export let stageRect

  let stageWidth, stageHeight

  $: {
    ({width: stageWidth, height: stageHeight} = stageRect)
    stageWidth = Math.round(stageWidth)
    stageHeight = Math.round(stageHeight)
  }

  $: {
    if (dark)
      document.body.classList.add('dark')
    else 
      document.body.classList.remove('dark')
  }

  function toggleSidebar() {
    active = !active
    updateStage()
  }

  function toggleDarkmode() {
    dark = !dark
  }

  function setFramesize(nStageSize) {
    stageSize = nStageSize
    updateStage()
  }

  function toggleOrientation() {
    landscape = !landscape
    updateStage()
  }

  function openInTab() {
    dispatch('out', {
      openInTab: true
    })
  }

  function updateStage() {
    dispatch('out', {
      active,
      stageSize,
      landscape
    })
  }

  function handleThemeChange(theme) {
    dispatch('out', {
      selectTheme: theme
    })
  }

</script>

<div class="topbar">
  <div class="topbar_container">
    <button class="sidebar_toggle" on:click={toggleSidebar} title={ active ? 'Collapse sidebar' : 'Expand sidebar'}>
      {#if active}
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18m7-6l-3-3 3-3"/></svg>
      {:else}
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18m5-12l3 3-3 3"/></svg>
      {/if}
    </button>
    <div class="topbar_nav">
      <div class="stagesize_value">{stageWidth}px <span class="multiplication_sign">&#10005;</span> {stageHeight}px</div>
      <div class="stagesize-nav">
        <button data-title="Small" class="tooltip" class:active={stageSize === 'small'} on:click={() => setFramesize('small')}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
        </button>
        <button data-title="Medium" class="tooltip" class:active={stageSize === 'medium'} on:click={() => setFramesize('medium')}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
        </button>
        <button data-title="Large" class="tooltip" class:active={stageSize === 'large'} on:click={() => setFramesize('large')}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" ry="2"/><path d="M2 20h20"/></svg>
        </button>
        <button data-title="Full" class="tooltip" class:active={stageSize === 'full'} on:click={() => setFramesize('full')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>
        </button>
        <button data-title={ landscape ? 'Portrait mode' : 'Landscape mode'} class="tooltip" on:click={toggleOrientation}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77a1.49 1.49 0 00-2.12 0L1.75 8.11a1.49 1.49 0 000 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29A10.487 10.487 0 011.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"/></svg>
        </button>
      </div>
      <button class="open-new-tab" title="Open component in new tab" on:click="{openInTab}">
        <svg xmlns="http://www.w3.org/2000/svg" class="open-new-tab-icon" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"/></svg>
      </button>
      {#if themes.length > 1}
      <div class="dropdown">
        <button class="dropdown_btn" title="Switch component theme">Themes<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="dropdown_items">
          <ul>
            {#each themes as theme}
            <li><button class:active="{theme.active}" on:click="{() => handleThemeChange(theme.name)}">{theme.name}</button></li>
            {/each}            
          </ul>
        </div>
      </div>
      {/if}
      <button class="switch-mode" on:click={toggleDarkmode} title={dark ? 'Light mode' : 'Dark mode'} >
        {#if dark}
        <svg xmlns="http://www.w3.org/2000/svg" class="mode-icon" width="24" viewBox="0 0 24 24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        {:else }
        <svg xmlns="http://www.w3.org/2000/svg" class="mode-icon" height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.364 6.364 0 009 9 9 9 0 11-9-9z"/></svg>
        {/if}
      </button>
    </div>
  </div>
</div>

<style>
  .topbar {
    width: 100%;
    height: 2.75rem;
    background-color: var(--c-basic-100);
    /* border-bottom: 1px solid var(--c-basic-300); */
  }
  .topbar_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .sidebar_toggle {
    padding: 0 0.75rem;
    height: 2.75rem;
    background: none;
    cursor: pointer;
  }
  .sidebar_toggle:hover {
    background-color: var(--c-basic-150);
  }
  .sidebar_toggle svg {
    height: 1.125rem;
    color: var(--c-basic-700);
  }
  .sidebar_toggle:hover svg {
    color: var(--c-primary);
  }
  .topbar_nav {
    display: flex;
    align-items: center;
  }
  /* theme dropdown nav */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown:hover {
    background-color: var(--c-basic-150);
  }
  .dropdown_btn {
    display: flex;
    align-items: center;
    padding: 0 0.5rem 0 0.75rem;
    height: 2.688rem;
    font-size: 0.875rem;
    color: var(--c-basic-700);
    background: none;
    border: none;
    cursor: pointer;
  }
  .dropdown:hover .dropdown_btn {
    color: var(--c-primary);
  }
  .dropdown_btn svg {
    margin-left: 0.125rem;
    color: var(--c-basic-700);
  }
  .dropdown:hover .dropdown_btn svg {
    color: var(--c-primary);
  }
  .dropdown_items {
    visibility: hidden;
    position: absolute;
    right: 0;
    padding: 0;
    z-index: 9;
  }
  .dropdown_items ul {
    margin: 0;
    padding: 0;
    background-color: var(--c-basic-150);
    overflow: hidden;
  }
  .dropdown_items ul li {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropdown_items ul li button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1.25rem;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    text-transform: capitalize;
    white-space: nowrap;
    background-color: transparent;
    border: none;
    border-left: 3px solid transparent;
    cursor: pointer;
  }
  .dropdown_items ul li button:hover {
    color: var(--c-basic-900);
    background-color: var(--c-basic-200);
    border-left: 3px solid var(--c-primary);
  }
  .dropdown_items ul li button.active,
  .dropdown_items ul li button.active:hover {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
    border-left: 3px solid var(--c-primary);
  }
  .dropdown:hover > .dropdown_items,
  .dropdown:focus > .dropdown_items {
    display: block;
    visibility: visible;
  }
  /* switch to dark mode */
  .switch-mode {
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    height: 2.625rem;
    background: none;
    cursor: pointer;
  }
  .switch-mode:hover {
    background-color: var(--c-basic-150);
  }
  svg.mode-icon {
    height: 1.125rem;
    color: var(--c-basic-700);
  }
  .switch-mode:hover svg.mode-icon {
    color: var(--c-primary);
  }
 
  /* futur feature */
  .stagesize_value {
    display: none;
  }
  @media (min-width: 640px) {
    .stagesize_value {
      display: block;
      font-size: 0.813rem;
      padding: 0 1.25rem;
      color: var(--c-basic-500);
    }
    .stagesize_value .multiplication_sign {
      font-size: 0.563rem;
    }
  }

   /* stagesize */
  .stagesize-nav {
    display: none;
  }
  @media (min-width: 1280px) {
    .stagesize-nav {
      display: flex;
      flex-direction: row;
      align-self: center;
      height: 2.688rem;
      background-color: var(--c-basic-150);
    }
    .stagesize-nav button {
      height: 2.688rem;
      margin: 0;
      padding: 0 0.25rem;
      background: none;
      border-top: 3px solid transparent;
      cursor: pointer;
    }
    .stagesize-nav button:hover,
    .stagesize-nav button.active {
      border-top: 3px solid var(--c-primary);
    }
    .stagesize-nav button.active {
      background-color: var(--c-primary-bg);
    }
    .stagesize-nav button svg {
      height: 1.125rem;
      color: var(--c-basic-700);
      transition: 0.2s;
    }
    .stagesize-nav button:hover svg,
    .stagesize-nav button.active svg {
      color: var(--c-primary);
    }
    .stagesize-nav button svg.landscape {
      transform: rotate(90deg);
      transition: 0.2s;
    }
    .stagesize-nav button.tooltip:hover::after {
      position: absolute;
      display: block;
      margin-top: 0.875rem;
      padding: 0.25rem;
      content: attr(data-title);
      font-size: 0.75rem;
      color: var(--c-basic-50);
      background-color: var(--c-basic-900);
      border-radius: 0.125rem;
    }
  }
  /* open in new tab */
  .open-new-tab {
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    height: 2.688rem;
    background: none;
    cursor: pointer;
  }
  .open-new-tab:hover {
    background-color: var(--c-basic-150);
  }
  svg.open-new-tab-icon {
    height: 1.125rem;
    color: var(--c-basic-700);
  }
  .open-new-tab:hover svg.open-new-tab-icon {
    color: var(--c-primary);
  }
</style>
