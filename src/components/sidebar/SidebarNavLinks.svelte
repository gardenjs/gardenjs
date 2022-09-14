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
    padding: 0.75rem 1.75rem;
    text-transform: initial;
    font-weight: 500;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    border-left: 3px solid transparent;
  }
  a:hover,
  a:focus {
    color: var(--c-basic-900);
    background-color: var(--c-basic-300);
  }
  a.selected {
    color: var(--primary);
    font-weight: 600;
    border-left: 3px solid var(--primary);
    background-color: var(--primary-bg);
  }

</style>
