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

<style>
.tabs__nav nav {
  background-color: var(--infopanel-nav-bg-color);
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
  color: var(--infopanel-nav-color);
  text-align: center;
  cursor: pointer;
  border: none;
  background: none;
  border-bottom: 3px solid var(--infopanel-nav-border-color);
}
.tabs__nav nav li button:hover {
  color: var(--infopanel-nav-hover-color);
  border-bottom: 3px solid var(--infopanel-nav-border-hover-color);
}
.tabs__nav nav li button.active {
  color: var(--infopanel-nav-hover-color);
  border-bottom: 3px solid var(--infopanel-nav-hover-color);
}
.tabs__nav nav li button.active:hover {
  border-bottom: 3px solid var(--infopanel-nav-border-act-hover-color);
}

.tabs__pane {
  padding: 20px;
  background-color: var(--infopanel-pane-bg-color);
  color: var(--infopanel-pane-text-color);
}
</style>