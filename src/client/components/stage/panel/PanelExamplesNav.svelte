<script>
  let { examples = [], selected, onSelectExample } = $props()
</script>

<ul class="examples">
  {#each examples as example, index (index)}
    <li class:active={selected == example}>
      <button onclick={() => onSelectExample(example)}>
        <span class="dot"></span>
        {example}
      </button>
    </li>
  {/each}
</ul>

<style>
  .examples {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .examples li button {
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
  .examples li button .dot {
    display: block;
    margin: 0 0.5rem 0 0;
    height: 0.375rem;
    width: 0.375rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .examples li.active button .dot {
    background-color: var(--c-primary);
  }
  .examples li:nth-child(odd) button {
    background-color: var(--c-basic-50);
  }
  .examples li button:hover,
  .examples li button:focus-visible {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-150);
  }
  .examples li.active button {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
  }
  .examples li.active button:focus-visible {
    background-color: var(--c-basic-150);
  }
</style>
