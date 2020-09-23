<script>
import { createEventDispatcher } from 'svelte'

export let items = [] 
export let selected

const dispatch = createEventDispatcher()

const handleselect = item => () => {
  dispatch('out', {selecteditem : item})
}

</script>

<div>
  <ul>
    {#each items as item}
    <li class:active="{selected == item}" on:click={handleselect(item)}>{item}</li>
    {/each}
  </ul>
</div>

<style>
ul {
  list-style: none;
  padding: 0;
}
 li {
   padding: 5px 12px;
   cursor: pointer;
 }
 .active {
   border: 1px solid green;
   color: gray;   
 }
</style>
