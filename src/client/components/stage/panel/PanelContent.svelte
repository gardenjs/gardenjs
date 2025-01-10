<script>
  /**
   * @typedef {Object} Props
   * @property {any} [item]
   */

  /** @type {Props} */
  let { item = {} } = $props()
</script>

<item.page {...item.props} on:out />
