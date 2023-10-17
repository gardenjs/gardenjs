<script>
  export let href
  export let selected
  export let level

  function handleClick(evt) {
    globalThis.history.pushState({}, '', href)
  }
</script>

<a
  {href}
  class="component_link link_level-{level}"
  class:selected
  on:click|preventDefault={handleClick}
>
  <span class="dot"></span>
  <span class="component_icon"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      viewBox="0 0 24 24"
      height="15"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-box"
      ><path
        d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
      /><path d="M3.3 7l8.7 5 8.7-5M12 22V12" /></svg
    ></span
  >
  <span class="component_label"><slot /></span>
</a>

<style>
  .component_link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0.188rem 0 0.188rem 0;
    text-transform: initial;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    line-height: 1.2;
    font-weight: 400;
  }
  .component_link:hover,
  .component_link:focus {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-100);
  }
  .component_link .dot {
    display: block;
    margin: 0 0.5rem 0 -0.188rem;
    height: 0.375rem;
    width: 0.375rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .component_link.selected .dot {
    background-color: var(--c-primary);
  }
  .component_link.selected {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
  }
  .component_icon {
    display: flex;
    align-items: center;
    margin-right: 0.438rem;
    color: var(--c-basic-400);
  }
  .component_label {
    margin-right: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
