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
  margin: 0 0 0 -0.125rem;
  padding: 0.188rem 0 0.188rem 0.813rem;
  text-transform: initial;
  font-size: 0.813rem;
  color: var(--c-basic-600);
  line-height: 1.3;
  font-weight: 400;
  border-left: 0.188rem solid transparent;
}
a:hover,
a:focus {
  color: var(--c-basic-900);
  border-color: var(--c-primary);
}
a.selected {
  color: var(--c-primary);
  border-color: var(--c-primary);
  background-color: var(--c-primary-bg);
}
a.selected:hover {
  padding-left: 0.75rem;
}
</style>
