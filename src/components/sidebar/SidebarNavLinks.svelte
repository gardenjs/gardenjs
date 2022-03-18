<script>
  export let href

  function handleClick(evt) {
    globalThis.history.pushState({}, '', href)
  }

</script>

<a href={href} on:click|preventDefault={handleClick}>
<slot />
</a>

<style>
  a {
    display: block;
    margin: 0;
    padding: 0.375rem 1rem;
    text-transform: initial;
    text-decoration: none;
    font-weight: 400;
    color: var(--c-basic-500);
    border-left: 1px solid var(--c-basic-300);
  }
  a.active,
  a:hover,
  a:focus {
    padding: 0.375rem 1rem 0.375rem 0.875rem;
    color: var(--c-basic-900);
    border-left: 3px solid var(--primary);
  }
  a.active {
    color: var(--c-basic-900);
    font-weight: 600;
  }
</style>