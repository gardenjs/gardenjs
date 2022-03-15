<script> 
  import TabContent from './TabContent.svelte'
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
</div>

<style>
.panel {
  flex-grow: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: var(--c-basic-50);
  border-left: 1px solid var(--c-basic-400);
  border-right: 1px solid var(--c-basic-400);
}
.panel__nav nav ul {
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  overflow-x: auto;
  height: 2rem;
  margin: 0;
  padding: 0;
}
.panel__nav nav li {
  display: flex;
  flex: auto;
  height: 100%;
}
.panel__nav nav li button {
  width: 100%;
  min-width: 150px;
  height: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--c-basic-900);
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: var(--c-basic-200);
  border-bottom: 3px solid var(--c-basic-400);
}
.panel__nav nav li button.active {
  border-bottom: 3px solid var(--primary);
}
.panel__nav nav li button:hover {
  background-color: var(--c-basic-100);
  border-color: var(--c-basic-500);
}
.panel__nav nav li button.active:hover {
  border-color: var(--primary-lighter);
}
.panel__pane {
  padding: 1.25rem;
  background-color: var(--c-basic-50);
  color: var(--c-basic-900);
}
</style>