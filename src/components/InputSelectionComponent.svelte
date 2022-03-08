<script>
import { createEventDispatcher } from 'svelte'

export let items = [] 
export let selected

const dispatch = createEventDispatcher()

const handleselect = item => () => {
  dispatch('out', {selecteditem : item})
}

</script>

<ul class="component__stories">
  {#each items as item}
  <li class:active="{selected == item}" on:click={handleselect(item)}>{item}</li>
  {/each}
</ul>

<style>
.component__stories {
  list-style: none;
  margin: 0;
  padding: 0;
}
.component__stories li {
  margin: 0.125rem 0;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: var(--gray-900);
  cursor: pointer;
}
.component__stories li:nth-child(odd) {
  background-color: var(--gray-100);
}
.component__stories li:hover,
.component__stories li:focus,
.component__stories li.active {
    color: var(--white);
    background-color: var(--gray-600);
  }
</style>