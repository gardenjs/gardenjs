<script>
  import { createEventDispatcher } from 'svelte'

  /**
   * @typedef {Object} Props
   * @property {any} [items]
   * @property {any} selected
   */

  /** @type {Props} */
  let { items = [], selected } = $props()

  const dispatch = createEventDispatcher()

  const handleselect = (item) => () => {
    dispatch('out', { selecteditem: item })
  }
</script>

<ul class="stories">
  {#each items as item}
    <li class:active={selected == item}>
      <button onclick={handleselect(item)}>
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
  .stories li button:hover,
  .stories li button:focus-visible {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-150);
  }
  .stories li.active button {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
  }
  .stories li.active button:focus-visible {
    background-color: var(--c-basic-150);
  }
</style>
