<script>
  let {
    options = [],
    dropright = false,
    handleButtonClick,
    buttonSnippet,
  } = $props()
</script>

{#if options.length > 1}
  <div class="dropdown">
    {@render buttonSnippet?.()}
    <div class="dropdown_items" class:dropdown_items-right={dropright}>
      <ul>
        {#each options as option (option.name)}
          <li>
            <button
              class:active={option.active}
              onclick={() => handleButtonClick(option.name)}
            >
              <span class="dropdown_item-dot"></span>
              {option.name}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{:else}
  {@render buttonSnippet?.({
    onClick: () => {
      handleButtonClick(options[0].name)
    },
  })}
{/if}

<style>
  /* theme dropdown nav */
  .dropdown {
    position: relative;
    display: inline-block;
    z-index: 99;
  }
  .dropdown_items {
    visibility: hidden;
    position: absolute;
    left: 0;
    padding: 0.375rem 0 0;
    z-index: 9;
  }
  .dropdown_items-right {
    left: unset;
    right: 0;
  }
  .dropdown_items ul {
    margin: 0;
    padding: 0;
    background-color: var(--c-basic-50);
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .dropdown_items ul li {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropdown_items ul li button {
    display: flex;
    align-items: center;
    justify-items: flex-start;
    width: 100%;
    min-width: 5rem;
    padding: 0.5rem;
    font-size: 0.75rem;
    color: var(--c-basic-900);
    font-weight: 500;
    text-transform: capitalize;
    white-space: nowrap;
  }
  .dropdown_items ul li button .dropdown_item-dot {
    display: block;
    margin: 0 0.5rem 0 0;
    height: 0.313rem;
    width: 0.313rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .dropdown_items ul li button.active .dropdown_item-dot,
  .dropdown_items ul li button.active:hover .dropdown_item-dot {
    background-color: var(--c-primary);
  }
  .dropdown_items ul li button:hover,
  .dropdown_items ul li button:focus-visible {
    color: var(--c-primary);
    background-color: var(--c-basic-100);
  }
  .dropdown_items ul li button.active {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
    border-color: var(--c-primary);
  }
  .dropdown:hover > .dropdown_items,
  .dropdown:focus-visible > .dropdown_items {
    display: block;
    visibility: visible;
  }
</style>
