<script>
  import { createEventDispatcher } from 'svelte'

  export let items = []
  export let selected

  const dispatch = createEventDispatcher()

  const handleselect = (item) => () => {
    dispatch('out', { selecteditem: item })
  }
</script>

<ul class="stories">
  {#each items as item}
    <li class:active={selected == item}>
      <button on:click={handleselect(item)}>
        <span class="dot"></span>
        {item}
      </button>
    </li>
  {/each}
</ul>

<style>
  .stories {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .stories li button {
    display: flex;
    align-items: center;
    justify-items: flex-start;
    margin: 0;
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;
    width: 100%;
    font-size: 0.9rem;
    color: var(--c-basic-600);
    text-align: left;
  }
  .stories li button .dot {
    display: block;
    margin: 0 0.5rem 0 0;
    height: 0.375rem;
    width: 0.375rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .stories li.active button .dot {
    background-color: var(--c-primary);
  }
  .stories li:nth-child(odd) button {
    background-color: var(--c-basic-50);
  }
  .stories li:focus button,
  .stories li:hover button {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-100);
  }
  .stories li.active button {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
  }
</style>
