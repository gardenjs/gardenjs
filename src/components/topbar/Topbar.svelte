<script>
  import { createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()

  export let active = true
  export let dark = false
  export let landscape = false
  export let stageSize = 'full'

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
</script>

<div class="topbar">
  <div class="topbar__inner">
    <button class="topbar__toggle-btn" on:click={toggleSidebar} title="toggle sidebar">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#fff"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
    </button>
    <div class="topbar__nav">
      <div class="stagesize-nav">
        <button rel="Small" class="tooltip" class:active={stageSize === 'small'} on:click={() => setFramesize('small')}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M15.5 1h-8A2.5 2.5 0 005 3.5v17A2.5 2.5 0 007.5 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0015.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/></svg>
        </button>
        <button rel="Medium" class="tooltip" class:active={stageSize === 'medium'} on:click={() => setFramesize('medium')}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M18.5 0h-14A2.5 2.5 0 002 2.5v19A2.5 2.5 0 004.5 24h14a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0018.5 0zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4H4V3h15v16z"/></svg>
        </button>
        <button rel="Large" class="tooltip" class:active={stageSize === 'large'} on:click={() => setFramesize('large')}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>
        </button>
        <button rel="Full" class="tooltip" class:active={stageSize === 'full'} on:click={() => setFramesize('full')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/></svg>
        </button>
        <button rel="Toggle Portrait/Landscape" class="tooltip" on:click={toggleOrientation}>
          <svg xmlns="http://www.w3.org/2000/svg" class:landscape={landscape} height="24" viewBox="0 0 24 24" width="24" fill="#currentColor"><path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77a1.49 1.49 0 00-2.12 0L1.75 8.11a1.49 1.49 0 000 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29A10.487 10.487 0 011.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"/></svg>
        </button>
      </div>
      <button class="open-new-tab" title="Open component in new tab" on:click="{openInTab}">
        <svg xmlns="http://www.w3.org/2000/svg" class="open-new-tab-icon" height="20" viewBox="0 0 24 24" width="20"><path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z"/></svg>
      </button>
      <div class="dropdown">
        <button class="dropdown__btn" title="switch component theme">Themes<svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" height="24"><path d="M22.288 9.29l-3.88 3.88-3.88-3.88a.998.998 0 00-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.998.998 0 000-1.41c-.39-.38-1.03-.39-1.42 0z" fill-rule="nonzero"/></svg></button>
        <div class="dropdown__items">
          <ul>
            <li><a href="./">Default Project Theme</a></li>
          </ul>
        </div>
      </div>
      <button class="switch-mode" on:click={toggleDarkmode} title="dark/light mode">
        {#if dark}
        <svg xmlns="http://www.w3.org/2000/svg" class="mode-icon" height="20" viewBox="0 0 24 24" width="20" fill="#currentColor"><path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>
        {:else }
        <svg xmlns="http://www.w3.org/2000/svg" class="mode-icon" height="20" viewBox="0 0 24 24" width="20" fill="#currentColor"><path d="M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
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
    border-bottom: 1px solid var(--c-basic-400);
  }
  .topbar__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .topbar__toggle-btn {
    margin-top: 0.188rem;
    padding: 0 1rem;
    height: 2.625rem;
    /* border: none; */
    background: none;
    border-bottom: 0.188rem solid transparent;
    cursor: pointer;
  }
  .topbar__toggle-btn:hover {
    border-color: var(--primary);
  }
  .topbar__toggle-btn svg {
    fill: var(--c-basic-700);
  }
  .topbar__toggle-btn:hover svg {
    fill: var(--primary);
  }
  .topbar__nav {
    display: flex;
    align-items: center;
  }
  .switch-mode {
    display: flex;
    align-items: center;
    margin-top: 0.188rem;
    padding: 0 1.25rem;
    height: 2.625rem;
    background: none;
    cursor: pointer;
    border-bottom: 0.188rem solid transparent;
  }
  .switch-mode:hover {
    border-color: var(--primary);
  }
  svg.mode-icon {
    fill: var(--c-basic-700);
  }
  .switch-mode:hover svg.mode-icon {
    fill: var(--primary);
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown__btn {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    line-height: 2.438rem;
    font-size: 0.875rem;
    color: var(--c-basic-700);
    background: none;
    border: none;
    cursor: pointer;
  }
  .dropdown__btn:hover {
    color: var(--primary);
  }
  .dropdown__btn svg {
    fill: var(--c-basic-700);
  }
  .dropdown__btn:hover svg {
    fill: var(--primary);
  }
  .dropdown__items {
    visibility: hidden;
    position: absolute;
    padding: 0;
    z-index: 9;
  }
  .dropdown__items ul {
    margin: 0;
    padding: 0;
    border: 1px solid var(--c-basic-400);
    border-top: 0.188rem solid var(--primary);
    border-radius: 0 0 0.25rem 0.25rem;
    overflow: hidden;
  }
  .dropdown__items ul li {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropdown__items ul li a {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    color: var(--c-basic-900);
    text-decoration: none;
    white-space: nowrap;
    background-color: var(--c-basic-50);
  }
  .dropdown__items ul li a:hover {
    color: var(--primary);
  }
  .dropdown:hover > .dropdown__items,
  .dropdown:focus > .dropdown__items {
    display: block;
    visibility: visible;
  }
  /* stagesize */
  .stagesize-nav {
    display: none;
  }
  @media only screen and (min-width: 1280px) {
    .stagesize-nav {
      display: block;
      align-self: center;
      padding: 0.188rem 0.75rem 0 0;
    }
    .stagesize-nav button {
      float: left;
      margin: 0;
      padding: 0 0.25rem;
      height: 2.625rem;
      background: none;
      border-bottom: 0.188rem solid transparent;
      cursor: pointer;
    }
    .stagesize-nav button:hover,
    .stagesize-nav button.active {
      border-bottom: 0.188rem solid var(--primary);
    }
    .stagesize-nav button svg {
      height: 18px;
      fill: var(--c-basic-700);
    }
    .stagesize-nav button:hover svg,
    .stagesize-nav button.active svg {
      fill: var(--primary);
    }
    .stagesize-nav button svg.landscape {
      transform: rotate(90deg);
    }
    .stagesize-nav button.tooltip:hover::after {
      position: absolute;
      display: block;
      margin-top: 0.875rem;
      padding: 0.25rem;
      content: attr(rel);
      font-size: 0.75rem;
      color: var(--c-basic-50);
      background-color: var(--c-basic-900);
      border-radius: 0.125rem;
    }
  }
  .open-new-tab {
    display: flex;
    align-items: center;
    margin-top: 0.188rem;
    padding: 0 1.25rem;
    height: 2.625rem;
    background: none;
    cursor: pointer;
    border-bottom: 0.188rem solid transparent;
  }
  .open-new-tab:hover {
    border-color: var(--primary);
  }
  svg.open-new-tab-icon {
    fill: var(--c-basic-700);
  }
  .open-new-tab:hover svg.open-new-tab-icon {
    fill: var(--primary);
  }
</style>
