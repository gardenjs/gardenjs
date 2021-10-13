<script>
import { createEventDispatcher } from 'svelte'

export let items = [] 
export let selected

const dispatch = createEventDispatcher()

const handleselect = item => () => {
  dispatch('out', {selecteditem : item})
}

</script>

<ul>
  {#each items as item}
  <li class:active="{selected == item}" on:click={handleselect(item)}>{item}</li>
  {/each}
</ul>