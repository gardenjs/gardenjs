<script>
  export let href

  function handleClick(evt) {
    evt.preventDefault()
    globalThis.history.pushState({}, '', href)
  }
</script>
<a href={href} on:click={handleClick}>
<slot />
</a>

