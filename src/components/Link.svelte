<script>
  export let href

  function handleClick(evt) {
    globalThis.history.pushState({}, '', href)
  }

</script>
<a href={href} on:click|preventDefault={handleClick}>
<slot />
</a>

