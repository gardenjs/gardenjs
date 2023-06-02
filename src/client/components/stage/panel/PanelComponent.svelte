<script> 
  import TabContent from './PanelContent.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let tabs = []

  let selectedTabName = {}
  let selectedTab
  $: {
    if (tabs) {
      selectedTab = tabs.find(t => t.name === selectedTabName) || tabs[0]
    } else {
      selectedTab = {}
    }
  }

  const handleSelect = tab => () => {
    selectedTabName = tab.name
    dispatch('out', {selecteditem : tab})
  }

  function handleout(evt) {
    if (selectedTab.out) {
      selectedTab.out(evt)
    }
  }
 
</script>

<div class="panel">
  {#if tabs.length}
    <div class="panel_nav">
      <nav>
        <ul>
          {#each tabs as tab}
          <li><button class:active="{tab == selectedTab}" on:click={handleSelect(tab)}>{tab.name}</button></li>
          {/each}
        </ul>
      </nav>
    </div>
    <div class="panel_pane">
      {#if selectedTab && selectedTab.page }
      <TabContent item={selectedTab} on:out={handleout} />
      {:else}
      <slot>No tab content provided</slot>
      {/if}
    </div>
  {/if}
</div>

<style>
.panel {
  position: relative;
  margin-bottom: 0.375rem;
  height: 100%;
  width: 100%;
  background-color: var(--c-basic-50);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  overflow-y: auto;
}
.panel_nav {
  position: sticky;
  top: 0;
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
  border-bottom: 3px solid var(--c-primary);
}
.panel_nav nav li button:hover {
  border-color: var(--c-primary);
}
.panel_pane {
  padding: 1.25rem;
  color: var(--c-basic-900);
  background-color: var(--c-basic-50);
}
</style>
