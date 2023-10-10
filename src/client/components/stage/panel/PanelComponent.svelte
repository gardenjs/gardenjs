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
                on:click={handleSelect(tab)}>{tab.name}</button
              >
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
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-panel-bottom-close"
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
  .panel_nav {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    background-color: var(--c-basic-50);
    border-bottom: 1px solid var(--c-basic-300);
  }
  .panel_nav nav {
    margin: 0 1.25rem;
  }
  .panel_nav nav ul {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  }
  .panel_nav nav li {
    height: 100%;
  }
  .panel_nav nav li button {
    margin-bottom: -1px;
    padding: 0.375rem 1.25rem;
    height: 100%;
    font-size: 0.875rem;
    color: var(--c-basic-900);
    white-space: nowrap;
    text-transform: capitalize;
    background-color: transparent;
    border: none;
    border-bottom: 0.188rem solid transparent;
    cursor: pointer;
  }
  .panel_nav nav li button.active {
    color: var(--c-primary);
    border-bottom: 0.188rem solid var(--c-primary);
  }
  .panel_nav nav li button:hover {
    border-color: var(--c-primary);
  }
  .panel_toggle {
    padding: 0 0.75rem;
    background: none;
    cursor: pointer;
  }
  .panel_toggle:hover {
    background-color: var(--c-basic-150);
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
    padding: 1.25rem;
    color: var(--c-basic-900);
  }
</style>
