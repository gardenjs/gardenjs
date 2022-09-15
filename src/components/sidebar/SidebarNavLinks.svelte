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
    padding: 0.375rem 0 0.375rem 2.125rem;
    text-transform: initial;
    font-weight: 400;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    border-left: 3px solid transparent;
  }
  a:hover,
  a:focus {
    color: var(--c-basic-900);
    border-left: 3px solid var(--c-basic-500);
    background-color: var(--c-basic-150);
  }
  a.selected {
    color: var(--c-primary);
    font-weight: 600;
    border-left: 3px solid var(--c-primary);
    background-color: var(--c-primary-bg) !important;
  }

</style>
