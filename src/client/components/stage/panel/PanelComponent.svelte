<script>
  import TabContent from './PanelContent.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let tabs = []

  let selectedTabName = {}
  let selectedTab
  $: {
    if (tabs) {
      selectedTab = tabs.find((t) => t.name === selectedTabName) || tabs[0]
    } else {
      selectedTab = {}
    }
  }

  const handleSelect = (tab) => () => {
    selectedTabName = tab.name
    dispatch('out', { selecteditem: tab })
  }

  function handleCollapsePanel() {
    dispatch('out', { toggleExpandPanel: true })
  }

  function handleout(evt) {
    if (selectedTab.out) {
      selectedTab.out(evt)
    }
  }
</script>

<div class="panel_container">
  {#if tabs.length}
    <div class="panel_nav">
      <nav>
        <ul>
          {#each tabs as tab}
            <li>
              <button
                class:active={tab == selectedTab}
                on:click={handleSelect(tab)}
              >
                {tab.name}
                <span class="dot"></span>
              </button>
            </li>
          {/each}
        </ul>
      </nav>
      <button
        class="panel_toggle"
        title="Collapse panel"
        on:click={handleCollapsePanel}
      >
        <svg
          class="controls_btn-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line
            x1="3"
            x2="21"
            y1="15"
            y2="15"
          /><path d="m15 8-3 3-3-3" /></svg
        >
      </button>
    </div>
    <div class="panel_pane">
      {#if selectedTab && selectedTab.page}
        <TabContent item={selectedTab} on:out={handleout} />
      {:else}
        <slot>No tab content provided</slot>
      {/if}
    </div>
  {/if}
</div>

<style>
  :root {
    --h-panelnav: 2.375rem;
  }
  .panel_container {
    background-color: var(--c-basic-75);
  }
  .panel_nav {
    position: sticky;
    top: 0;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    height: var(--h-panelnav);
    border-bottom: 1px solid var(--c-bg-body);
  }
  .panel_nav nav {
    margin: 0 1.25rem;
  }
  .panel_nav nav ul {
    display: flex;
    overflow-x: auto;
  }
  .panel_nav nav li button {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-content: center;
    align-items: center;
    padding: 0.563rem 1.25rem 0.188rem;
    padding: 0 1.25rem;
    height: var(--h-panelnav);
    font-size: 0.875rem;
    color: var(--c-basic-700);
    white-space: nowrap;
    text-transform: capitalize;
    overflow: hidden;
  }
  .panel_nav nav li button .dot {
    display: block;
    height: 0.313rem;
    width: 0.313rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .panel_nav nav li button.active .dot {
    background-color: var(--c-primary);
  }
  .panel_nav nav li button:hover {
    color: var(--c-primary);
  }
  .panel_nav nav li button.active {
    color: var(--c-primary);
    font-weight: 600;
  }
  .panel_toggle {
    padding: 0 0.75rem;
    background: none;
  }
  .panel_toggle svg {
    margin-top: 0.188rem;
    height: 1.375rem;
    color: var(--c-basic-700);
  }
  .panel_toggle:hover svg {
    color: var(--c-primary);
  }
  .panel_pane {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: var(--h-panelnav);
    padding: 1.25rem;
    overflow-y: auto;
  }
</style>
