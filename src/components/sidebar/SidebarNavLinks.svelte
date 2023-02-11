<script>
  export let href
  export let selected
  export let level

  function handleClick(evt) {
    globalThis.history.pushState({}, '', href)
  }

</script>

<a href={href} class="link_level-{level}" class:selected on:click|preventDefault={handleClick}>
<slot />
</a>

<style>
  a {
    padding: 0.188rem 0 0.188rem 0.75rem;
    text-transform: initial;
    font-weight: 400;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    border-left: 1px solid var(--c-basic-400);
  }
  a:hover,
  a:focus {
    color: var(--c-basic-900);
    border-left: 3px solid var(--c-primary);
  }
  a.selected {
    color: var(--c-primary);
    border-left: 3px solid var(--c-primary);
    padding-left: calc(0.75rem - 2px) !important;
    background-color: var(--c-primary-bg);
  }
  a.selected:hover {
    padding-left: 0.75rem;
  }
  .link_level-2 {
    margin-left: 1.938rem ;
  }
  .link_level-3 {
    margin-left: 2.063rem ;
  }
  .link_level-4 {
    margin-left: 3.063rem ;
  }
  .link_level-2:hover,
  .link_level-3:hover,
  .link_level-4:hover {
    padding-left: calc(0.75rem - 2px);
  }
</style>
