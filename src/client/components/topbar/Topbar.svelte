<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let active = true
  export let dark = false
  export let landscape = false
  export let stageSize = 'full'
  export let themes = []
  export let stageRect

  let stageWidth, stageHeight

  $: {
    ;({ width: stageWidth, height: stageHeight } = stageRect)
    stageWidth = Math.round(stageWidth)
    stageHeight = Math.round(stageHeight)
  }

  $: {
    if (dark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
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
      openInTab: true,
    })
  }

  function updateStage() {
    dispatch('out', {
      active,
      stageSize,
      landscape,
    })
  }

  function handleThemeChange(theme) {
    dispatch('out', {
      selectTheme: theme,
    })
  }
</script>

<div class="topbar">
  <div class="topbar_container">
    <button
      class="topbar_btn is-first-btn"
      on:click={toggleSidebar}
      title={active ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      {#if active}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path
            d="M9 3v18m7-6l-3-3 3-3"
          /></svg
        >
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path
            d="M9 3v18m5-12l3 3-3 3"
          /></svg
        >
      {/if}
    </button>
    <div class="topbar_nav">
      <div class="stagesize-value">
        <div>{stageWidth}px</div>
        <div class="stagesize-value-multi_sign">&#10005;</div>
        <div>{stageHeight}px</div>
      </div>
      <div class="stagesize-nav">
        <button
          title="Small"
          class:active={stageSize === 'small'}
          on:click={() => setFramesize('small')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class:landscape
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path
              d="M12 18h.01"
            /></svg
          >
          <span class="dot"></span>
        </button>
        <button
          title="Medium"
          class:active={stageSize === 'medium'}
          on:click={() => setFramesize('medium')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class:landscape
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path
              d="M12 18h.01"
            /></svg
          >
          <span class="dot"></span>
        </button>
        <button
          title="Large"
          class:active={stageSize === 'large'}
          on:click={() => setFramesize('large')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class:landscape
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><rect x="3" y="4" width="18" height="12" rx="2" ry="2" /><path
              d="M2 20h20"
            /></svg
          >
          <span class="dot"></span>
        </button>
        <button
          title="Full"
          class:active={stageSize === 'full'}
          on:click={() => setFramesize('full')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path
              d="M8 21h8m-4-4v4"
            /></svg
          >
          <span class="dot"></span>
        </button>
        <button
          title={landscape ? 'Portrait mode' : 'Landscape mode'}
          on:click={toggleOrientation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ratio"
            ><rect width="12" height="20" x="6" y="2" rx="2" /><rect
              width="20"
              height="12"
              x="2"
              y="6"
              rx="2"
            /></svg
          >
        </button>
      </div>
      {#if themes.length > 1}
        <div class="dropdown">
          <button
            class="dropdown_btn topbar_btn"
            title="Switch component theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><circle cx="13.5" cy="6.5" r=".5" /><circle
                cx="17.5"
                cy="10.5"
                r=".5"
              /><circle cx="8.5" cy="7.5" r=".5" /><circle
                cx="6.5"
                cy="12.5"
                r=".5"
              /><path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
              /></svg
            >
          </button>
          <div class="dropdown_items">
            <ul>
              {#each themes as theme}
                <li>
                  <button
                    class:active={theme.active}
                    on:click={() => handleThemeChange(theme.name)}
                  >
                    <span class="dropdown_item-dot"></span>
                    {theme.name}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}
      <button
        class="topbar_btn"
        title="Open component in new tab"
        on:click={openInTab}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="open-new-tab-icon"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path
            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"
          /></svg
        >
      </button>
      <button
        class="topbar_btn is-last-btn"
        on:click={toggleDarkmode}
        title={dark ? 'Light mode' : 'Dark mode'}
      >
        {#if dark}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mode-icon"
            width="24"
            viewBox="0 0 24 24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><circle cx="12" cy="12" r="4" /><path
              d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            /></svg
          >
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mode-icon"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M12 3a6.364 6.364 0 009 9 9 9 0 11-9-9z" /></svg
          >
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
    background-color: var(--c-bg-panels);
    border-radius: 0.5rem;
  }
  .topbar_container {
    display: flex;
    justify-content: space-between;
    padding: 1px;
    width: 100%;
    height: 100%;
    padding: 0;
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
  .topbar_btn svg {
    height: 1.125rem;
    color: var(--c-basic-700);
  }
  .topbar_btn:hover svg {
    color: var(--c-primary);
  }
  .is-first-btn {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .is-last-btn {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  /* stage size */
  .stagesize-value {
    display: none;
  }
  @media (min-width: 640px) {
    .stagesize-value {
      display: inline-flex;
      align-items: center;
      font-size: 0.75rem;
      padding: 0 1rem;
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
      color: var(--c-basic-500);
    }
    .stagesize-value-multi_sign {
      margin: 0 0.25rem;
      font-size: 0.813rem;
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
      margin: 0 0.75rem;
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
    .stagesize-nav button .dot {
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
    .stagesize-nav button.active .dot {
      background-color: var(--c-primary);
    }
  }

  /* theme dropdown nav */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown_items {
    visibility: hidden;
    position: absolute;
    left: -0.75rem;
    padding: 0.375rem 0 0;
    z-index: 9;
  }
  .dropdown_items ul {
    margin: 0;
    padding: 0;
    background-color: var(--c-basic-50);
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    border-radius: 0.5rem;
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
    justify-items: flex-start;
    width: 100%;
    min-width: 113px;
    padding: 0.5rem;
    font-size: 0.75rem;
    color: var(--c-basic-900);
    text-transform: capitalize;
    white-space: nowrap;
  }
  .dropdown_items ul li button .dropdown_item-dot {
    display: block;
    margin: 0 0.5rem 0 0;
    height: 0.313rem;
    width: 0.313rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .dropdown_items ul li button.active .dropdown_item-dot,
  .dropdown_items ul li button.active:hover .dropdown_item-dot {
    background-color: var(--c-primary);
  }
  .dropdown_items ul li button:hover {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-100);
  }
  .dropdown_items ul li button.active {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
    border-color: var(--c-primary);
  }
  .dropdown:hover > .dropdown_items,
  .dropdown:focus > .dropdown_items {
    display: block;
    visibility: visible;
  }
</style>
