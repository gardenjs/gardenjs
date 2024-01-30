<script>
  import { onMount } from 'svelte'
  export let component
  export let afterRenderHook = () => {}

  onMount(async () => {
    await afterRenderHook()
  })
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags-->
{@html component}
