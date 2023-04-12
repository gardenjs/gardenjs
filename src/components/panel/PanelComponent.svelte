<script> 
  import TabContent from './PanelContent.svelte'
  import { createEventDispatcher } from 'svelte'
  export let tabs = []
const dispatch = createEventDispatcher()

  let selectedIndex = 0
  let selected = {}
  $: selected = tabs ? tabs[selectedIndex] : {}

  const handleSelect = index => () => {
    selectedIndex = index
    dispatch('out', {selecteditem : tabs[selectedIndex]})
  }

  function handleout(evt) {
    if (selected.out) {
      selected.out(evt)
    }
  }
 
</script>

<div class="panel">
  {#if tabs.length}
    <div class="panel__nav">
      <nav>
        <ul>
          {#each tabs as tab, index}
          <li><button class:active="{tab == selected}" on:click={handleSelect(index)}>{tab.name}</button></li>
          {/each}
        </ul>
      </nav>
    </div>
    <div class="panel__pane">
      {#if selected && selected.page }
      <TabContent item={selected} on:out={handleout} />
      {:else}
      <slot>No tab content provided</slot>
      {/if}
    </div>
  {/if}
</div>

<style>
.panel {
  position: relative;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: var(--c-basic-50);
}
.panel__nav {
  position: sticky;
  top: 0;
  width: calc(100% - 2.5rem);
  margin: 0 1.25rem;
  padding-top: 0.5rem;
  background-color: var(--c-basic-50);
  border-bottom: 1px solid var(--c-basic-300);
}
.panel__nav nav ul {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  height: 2rem;
  margin: 0 0 -1px;
  padding: 0;
}
.panel__nav nav li {
  height: 100%;
}
.panel__nav nav li button {
  height: 100%;
  padding: 0 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--c-basic-900);
  white-space: nowrap;
  text-transform: capitalize;
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-bottom: 3px solid var(--c-basic-250);
}
.panel__nav nav li button.active {
  color: var(--c-primary);
  border-bottom: 3px solid var(--c-primary);
}
.panel__nav nav li button:hover {
  border-color: var(--c-primary);
}
.panel__pane {
  padding: 1.25rem;
  background-color: var(--c-basic-50);
  color: var(--c-basic-900);
}
</style>
