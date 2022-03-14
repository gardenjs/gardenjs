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
    margin: 0 -1rem -1rem;
    padding: 0.25rem 1rem;
    text-transform: initial;
    text-decoration: none;
    font-weight: 400;
    color: var(--c-basic-900);
  }
  a:hover,
  a:focus {
    background-color: var(--c-basic-200);
  }
</style>