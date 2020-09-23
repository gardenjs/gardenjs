<script>
  export let item = {}
</script>

<svelte:component this={item.page} {...item.props} on:out />

