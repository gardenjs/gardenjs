<script>
  /**
   * @typedef {Object} Props
   * @property {any} href
   * @property {any} selected
   * @property {any} text
   */

  /** @type {Props} */
  let { href, selected, text } = $props()

  function handleClick(event) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    globalThis.history.pushState({}, '', href)
  }
</script>

<!-- prettier-ignore -->
<a {href} class="component_link" class:selected onclick={handleClick}>
  <div class="component_link-container">
    <div class="component_dot"></div>
    <div class="component_icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 24 24" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.3 7l8.7 5 8.7-5M12 22V12" /></svg>
    </div>
    <!-- eslint-disable-next-line -->
    <div class="component_label">{@html text}</div>
  </div>
</a>

<style>
  .component_link {
    display: flex;
    margin: 0;
    padding: 0.188rem 0;
    width: 100%;
    height: 1.375rem;
    text-transform: initial;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    line-height: 1.2;
    font-weight: 400;
  }
  .component_link:hover,
  .component_link:focus-visible {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-100);
  }
  .component_link-container {
    display: flex;
    align-items: center;
  }
  .component_link .component_dot {
    margin: 0 0.5rem 0 -0.219rem;
    height: 0.375rem;
    width: 0.375rem !important;
    background-color: transparent;
    border-radius: 50%;
  }
  .component_link.selected .component_dot {
    background-color: var(--c-primary);
  }
  .component_link.selected {
    margin-left: -1px;
    color: var(--c-primary);
    font-weight: 600;
    background-color: var(--c-primary-bg);
    border-left: 1px solid var(--c-primary);
  }
  .component_icon {
    display: flex;
    align-items: center;
    margin: 0 0.5rem 0 0;
    color: var(--c-basic-400);
  }
  .component_label {
    margin-right: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
