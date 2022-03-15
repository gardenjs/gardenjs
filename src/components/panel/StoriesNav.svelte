<script>
import { createEventDispatcher } from 'svelte'

export let items = [] 
export let selected

const dispatch = createEventDispatcher()

const handleselect = item => () => {
  dispatch('out', {selecteditem : item})
}

</script>

<ul class="stories">
  {#each items as item}
  <li class:active="{selected == item}" on:click={handleselect(item)}>{item}</li>
  {/each}
</ul>

<style>
.stories {
  list-style: none;
  margin: 0;
  padding: 0;
}
.stories li {
  margin: 0.125rem 0;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: var(--c-basic-900);
  cursor: pointer;
}
.stories li:nth-child(odd) {
  background-color: var(--c-basic-100);
}
.stories li:hover,
.stories li:focus,
.stories li.active {
    color: var(--c-basic-50);
    background-color: var(--c-basic-600);
  }
</style>