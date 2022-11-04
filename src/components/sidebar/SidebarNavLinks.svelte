<script>
  export let href
  export let selected
  export let level

  function handleClick(evt) {
    globalThis.history.pushState({}, '', href)
  }

</script>

<a href={href} class="level-{level}" class:selected on:click|preventDefault={handleClick}>
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
    border-left: 3px solid var(--c-primary);
    background-color: var(--c-basic-150);
  }
  a.selected {
    color: var(--c-primary);
    font-weight: 600;
    border-left: 3px solid var(--c-primary);
    background-color: var(--c-primary-bg) !important;
  }

    /* 1. level */
  .level-2  {
    background-color: var(--c-basic-100);
  }
  .level-2:hover {
    background-color: var(--c-basic-150);
  }

  /* 2. level */
  .level-3 {
    padding-left: 2.75rem ;
    background-color: var(--c-basic-150);
  }
  .level-3:hover {
    background-color: var(--c-basic-200);
  }

  /* 3. level */
  .level-4 {
    padding-left: 3.5rem ;
    background-color: var(--c-basic-200);
  }
  .level-4:hover {
    background-color: var(--c-basic-250);
  }
</style>
