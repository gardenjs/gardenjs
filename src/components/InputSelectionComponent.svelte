<script>
import { createEventDispatcher } from 'svelte'

export let items = [] 
export let selected

const dispatch = createEventDispatcher()

const handleselect = item => () => {
  dispatch('out', {selecteditem : item})
}

</script>

<h3>Options:</h3>
<ul>
  {#each items as item}
  <li class:active="{selected == item}" on:click={handleselect(item)}>{item}</li>
  {/each}
</ul>

<style>
ul {
  list-style: none;
  padding: 0;
}
 li {
  border: 1px solid transparent;
   padding: 5px 12px;
   cursor: pointer;
 }
 .active {
   border: 1px solid green;
   color: green;
   font-weight: bold; 
 }
</style>
