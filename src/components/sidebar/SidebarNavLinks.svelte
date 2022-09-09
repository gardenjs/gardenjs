<script>
  export let href
  export let selected

  function handleClick(evt) {
    globalThis.history.pushState({}, '', href)
  }

</script>

<a href={href} class:selected on:click|preventDefault={handleClick}>
<slot />
</a>

<style>
  a {
    padding: 0.375rem 1rem;
    text-transform: initial;
    font-weight: 500;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    border-left: 1px solid var(--c-basic-300);
  }
  a.selected,
  a:hover,
  a:focus {
    padding: 0.375rem 1rem 0.375rem 0.875rem;
    color: var(--c-basic-900);
    border-left: 3px solid var(--primary);
  }
  a.selected {
    font-weight: 600;
  }

</style>
