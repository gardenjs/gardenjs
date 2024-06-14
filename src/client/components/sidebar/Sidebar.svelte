<script>
  import SidebarNav from './SidebarNav.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let nodes = []
  export let show
  export let rootNodesExpanded = true
  export let projectTitle
  export let filter
  export let panelExpanded = true

  function toggleRootFolders() {
    dispatch('out', { toggleRootFolders: true })
  }

  function updateFilter(event) {
    dispatch('out', { filter: { value: event.target.value } })
  }

  function toggleExpandPanel() {
    dispatch('out', { toggleExpandPanel: true })
  }
</script>

<header class="sidebar_container" class:show-sidebar={show}>
  <a class="project_title" href="/">
    <span>{projectTitle}</span>
  </a>
  <div class="filter">
    <!-- prettier-ignore -->
    <input class="filter_input" type="text" value={filter || ''} placeholder="Filter" on:input={updateFilter} />
  </div>
  {#if nodes.length == 0 && filter}
    <div>
      <div class="filter_zero-results">No results for '{filter}'</div>
    </div>
  {:else}
    <nav class="components">
      <SidebarNav {nodes} on:out />
    </nav>
  {/if}
  <nav class="controls">
    <!-- prettier-ignore -->
    <ul>
      <li>
        <button class="controls_btn" title={rootNodesExpanded ? 'Collapse' : 'Restore'} on:click={toggleRootFolders}>
          {#if rootNodesExpanded}
            <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20l5-5 5 5M7 4l5 5 5-5" /></svg>
          {:else}
            <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5" /></svg>
          {/if}
          <span class="controls_btn-label">{rootNodesExpanded ? 'Collapse' : 'Expand'} Navigation</span>
        </button>
      </li>
      <li>
        <button class="controls_btn" title={panelExpanded ? 'Collapse' : 'Restore'} on:click={toggleExpandPanel}>
          {#if panelExpanded}
            <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="15" y2="15" /><path d="m15 8-3 3-3-3" /></svg>
          {:else}
            <svg  class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="15" y2="15"/><path d="m9 10 3-3 3 3" /></svg>
          {/if}
          <span class="controls_btn-label">{panelExpanded ? 'Collapse' : 'Expand'} Panel</span>
        </button>
      </li>
      <li>
        <a class="controls_btn" href="https://github.com/rabbitdevelopment/garden" target="_blank" rel="noreferrer">
          <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"/></svg>
          <span class="controls_btn-label">Gardenjs Docs</span>
        </a>
      </li>
    </ul>
  </nav>
</header>

<style>
  .sidebar_container {
    --w-sidebar: 260px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0.375rem 0;
    width: 0;
    max-width: var(--w-sidebar);
    height: calc(100vh - 0.75rem);
    background-color: var(--c-sidebar-bg);
    border-radius: 0.625rem;
    transition: width 0.1s;
    overflow: hidden;
  }
  .show-sidebar {
    margin: 0.375rem 0.375rem 0.375rem 0;
    width: var(--w-sidebar);
    box-sizing: border-box;
  }
  .project_title {
    position: relative;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0.688rem;
    margin: 0 0 0.125rem;
    width: var(--w-sidebar);
    height: 2.25rem;
    background-color: var(--c-sidebar);
    z-index: 9;
    inline-size: var(--w-sidebar);
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.25rem;
    color: var(--c-primary);
    text-decoration: none;
    font-weight: 900;
    line-height: 1;
  }
  .project_title:focus {
    color: var(--c-basic-500);
    outline: none;
  }
  .project_title span {
    overflow: hidden;
  }
  .filter {
    display: flex;
    flex-shrink: 0;
    margin: 0 0 0.25rem;
    padding: 0.25rem 0.688rem;
    height: 2.25rem;
  }
  .filter_input {
    padding: 0.125rem 0.125rem 0.125rem 0.688rem;
    width: 100%;
    height: 100%;
    color: var(--c-basic-900);
    background-color: var(--c-basic-0);
    border: 1px solid var(--c-primary);
    border-radius: 1.75rem;
  }
  input.filter_input[type='text'] {
    font-size: 0.813rem;
  }
  .filter_input::placeholder {
    font-size: 0.813rem;
    color: var(--c-basic-900);
  }
  .filter_input:focus {
    outline: none;
    background-color: var(--c-basic-100);
    border: 1px solid var(--c-basic-500);
  }
  .filter_zero-results {
    width: var(--w-sidebar);
    padding: 0.5rem 0.688rem 0.375rem 0.688rem;
    text-transform: initial;
    font-size: 0.813rem;
    color: var(--c-basic-600);
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .components {
    display: flex;
    flex-shrink: 1;
    overflow: hidden;
    visibility: visible;
    width: var(--w-sidebar);
    overflow-y: auto;
    z-index: 1;
    margin: 0 0 1rem;
  }
  .controls {
    display: none;
  }
  @media (min-height: 35rem) {
    .controls {
      display: block;
      flex-shrink: 0;
      width: var(--w-sidebar);
      height: 103px;
      bottom: 0.375rem;
      padding: 0;
      background-color: var(--c-sidebar);
      border-top: 1px solid var(--c-bg-body);
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      overflow: hidden;
    }
  }
  .controls_btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 2.125rem;
    margin: 0;
    padding: 0 0.688rem;
    text-align: left;
  }
  .controls_btn:hover,
  .controls_btn:focus {
    background-color: var(--c-basic-100);
  }
  .controls_btn:focus {
    outline: none;
  }
  .controls_btn-icon {
    margin: 0;
    color: var(--c-basic-700);
  }
  .controls_btn-label {
    position: relative;
    align-self: center;
    margin-left: 0.75rem;
    width: 100%;
    color: var(--c-basic-900);
    font-size: 0.875rem;
    font-weight: 400;
  }
  .controls_btn:hover .controls_btn-label,
  .controls_btn:hover .controls_btn-icon,
  .controls_btn:focus .controls_btn-label,
  .controls_btn:focus .controls_btn-icon {
    color: var(--c-primary);
  }
</style>
