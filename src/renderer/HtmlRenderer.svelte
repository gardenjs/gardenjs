<script>
  import { onMount } from 'svelte'
  /**
   * @typedef {Object} Props
   * @property {any} component
   * @property {any} [afterRenderHook]
   */

  /** @type {Props} */
  let { component, afterRenderHook = () => {} } = $props()

  onMount(async () => {
    await afterRenderHook()
  })
</script>

{#if component}
  <!-- eslint-disable-next-line svelte/no-at-html-tags-->
  {@html component}
{/if}
