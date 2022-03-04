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
    margin: -0.25rem -1rem -1rem;
    padding: 0.125rem 1rem;
    text-transform: initial;
    text-decoration: none;
    font-weight: 400;
    color: var(--sidebar-nav-color);
    border-radius: 0.25rem;
  }
  a:hover,
  a:focus {
    color: var(--sidebar-nav-hover-color);
    background-color: var(--sidebar-nav-hover-bg-color);
  }
</style>