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
  <li class:active="{selected == item}"><button on:click={handleselect(item)}>{item}</button></li>
  {/each}
</ul>

<style>
  .stories {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .stories li button {
    margin: 0;
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 0.9rem;
    color: var(--c-basic-600);
    cursor: pointer;
    background-color: transparent;
    border-left: 1px solid var(--c-basic-300);
    text-align: left;
  }
  .stories li:nth-child(odd) button {
    background-color: var(--c-basic-100);
  }
  .stories li:hover button,
  .stories li:focus button,
  .stories li.active button {
    border-left: 3px solid var(--c-primary);
    padding-left: calc(1rem - 2px)
  }
  .stories li:hover button,
  .stories li:focus button {
    color: var(--c-basic-900);
    background-color: var(--c-basic-150);
  }
  .stories li.active button {
    color: var(--c-primary);
    background-color: var(--c-primary-bg);
  }
</style>