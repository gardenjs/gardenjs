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
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: var(--c-basic-900);
  cursor: pointer;
  border-left: 1px solid var(--c-basic-300);
}
.stories li:nth-child(odd) {
  background-color: var(--c-basic-100);
}
.stories li:hover,
.stories li:focus,
.stories li.active {
  padding-left: 0.875rem;
  border-left: 3px solid var(--primary);
}
.stories li:hover,
.stories li:focus {
  background-color: var(--c-basic-200);
}
.stories li.active {
  color: var(--primary);
  background-color: var(--primary-bg);
}
</style>