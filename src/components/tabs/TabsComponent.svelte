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

<div class="infopanel__nav">
  <nav>
    <ul>
      {#each tabs as tab, index}
      <li><button class:active="{tab == selected}" on:click={handleSelect(index)}>{tab.name}</button></li>
      {/each}
    </ul>
  </nav>
</div>
<div class="infopanel__pane">
  {#if selected && selected.page }
  <TabContent item={selected} on:out={handleout} />
  {:else}
  <slot>No tab content provided</slot>
  {/if}
</div>