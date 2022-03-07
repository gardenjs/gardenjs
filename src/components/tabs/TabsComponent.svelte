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

<div class="tabs">
  <div class="tabs__nav">
    <nav>
      <ul>
        {#each tabs as tab, index}
        <li><button class:active="{tab == selected}" on:click={handleSelect(index)}>{tab.name}</button></li>
        {/each}
      </ul>
    </nav>
  </div>
  <div class="tabs__pane">
    {#if selected && selected.page }
    <TabContent item={selected} on:out={handleout} />
    {:else}
    <slot>No tab content provided</slot>
    {/if}
  </div>
</div>

<style>
.tabs {
  flex-grow: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: var(--white);
}
.tabs__nav nav {
  background-color: var(--gray-50);
}
.tabs__nav nav ul {
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  overflow-x: auto;
  height: 2rem;
  margin: 0;
  padding: 0;
}
.tabs__nav nav li {
  display: flex;
  flex: auto;
  height: 100%;
}
.tabs__nav nav li button {
  width: 100%;
  min-width: 150px;
  height: 100%;
  font-size: 0.9rem;
  color: var(--gray-900);
  text-align: center;
  cursor: pointer;
  border: none;
  background: none;
  border-bottom: 3px solid var(--gray-400);
}
.tabs__nav nav li button:hover {
  color: var(--gray-900);
  border-bottom: 3px solid var(--gray-900);
}
.tabs__nav nav li button.active {
  color: var(--gray-900);
  border-bottom: 3px solid var(--primary);
}

.tabs__pane {
  padding: 20px;
  background-color: var(--white);
  color: var(--gray-900);
}
</style>