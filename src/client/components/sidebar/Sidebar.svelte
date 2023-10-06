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
    dispatch('out', {toggleRootFolders: true})
  }

  function updateFilter(event) {
    dispatch('out', {filter: {value : event.target.value}})
  }

  function toggleExpandPanel() {
    dispatch('out', {toggleExpandPanel: true})
  }
  
</script>
  
<div class="sidebar_container" class:show-sidebar={show}>
  <a class="project_title" href="/">
    <span>{projectTitle}</span>
  </a>
  <div class="filter">
    <input class="filter_input" type="text" value={filter || ''} placeholder="Filter" on:input={updateFilter}>
  </div>
  {#if nodes.length == 0 && filter}
  <div>
    <div class="nofilterresult">No results for '{filter}'</div>
  </div>
  {:else}
  <nav class="components">
    <ul>
      <SidebarNav nodes={nodes} on:out />
    </ul>
    <ul class="fixednav">
      <li>
        <button class="fixednav_btn" title={rootNodesExpanded ? 'Collapse' : 'Restore'} on:click={toggleRootFolders}>
          {#if rootNodesExpanded}
          <svg class="fixednav_btn-icon" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20l5-5 5 5M7 4l5 5 5-5"/></svg>
          {:else}
          <svg class="fixednav_btn-icon" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
          {/if}
          <span class="fixednav_btn-label">{rootNodesExpanded ? 'Collapse' : 'Expand'} Navigation</span>
        </button>
      </li>
      <li>
        <button class="fixednav_btn" title={panelExpanded ? 'Collapse' : 'Restore'} on:click={toggleExpandPanel}>
          {#if panelExpanded}
          <svg class="fixednav_btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="15" y2="15"/><path d="m15 8-3 3-3-3"/></svg>
          {:else}
          <svg class="fixednav_btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="15" y2="15"/><path d="m9 10 3-3 3 3"/></svg>
          {/if}
          <span class="fixednav_btn-label">{panelExpanded ? 'Collapse' : 'Expand'} Panel</span>
        </button>
      </li>
      <li>
        <a class="fixednav_link" href="https://github.com/rabbitdevelopment/garden" target="_blank" rel="noreferrer">
          <svg class="fixednav_link-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"/></svg>
          <span class="fixednav_link-label">Garden Docs</span>
        </a>
      </li>
    </ul>
  </nav>
  {/if}
</div>
  
<style>
  .sidebar_container {
    position: relative;
    margin: 0.375rem 0;
    padding: 0 0 4.688rem; /* Depending on the height of the fixednav to ensure that mainnav is fully visible when scrolling */
    width: 0;
    max-width: 260px;
    height: calc(100vh - 0.75rem);
    background-color: var(--c-basic-100);
    border-radius: 0.75rem;
    transition: width 0.1s;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .show-sidebar {
    margin: 0.375rem 0.375rem 0.375rem 0;
    width: 260px;
    box-sizing: border-box;
  }
  .project_title {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0.25rem 0.688rem;
    margin: 0 0 0.375rem;
    width: 260px;
    background-color: var(--c-basic-100);
    z-index: 9;
    --h-project-title: 2.25rem;
    height: var(--h-project-title);
    inline-size: 260px; 
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.25rem;
    color: var(--c-primary);
    text-decoration: none;
    font-weight: 900;
    line-height: 1;
  }
  .project_title span {
    overflow: hidden;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.5rem;
    height: 2rem;
  }
  .filter_input {
    padding: 0.125rem 0.125rem 0.125rem 0.688rem;;
    width: 100%;
    height: 100%;
    color: var(--c-basic-900);
    background-color: var(--c-basic-0);
    /* border: 1px solid var(--c-basic-250); */
    border-radius: 1.75rem;
  }
  input.filter_input[type="text"] {
    font-size: 0.813rem
  }
  .filter_input::placeholder {
    font-size: 0.813rem;
    color: var(--c-basic-900);
  }
  .filter_input:focus {
    outline: none;
  }
  .nofilterresult {
    width: 260px;
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
    width: 260px;
    /* height: calc(100vh - 56px); */
    z-index: 1;
  }
  .controls {
    position: fixed;
    width: 260px;
    bottom: 0.375rem;
    padding: 0;
    background-color: var(--c-basic-100);
    border-top: 1px solid var(--c-basic-300);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    overflow: hidden;
  }
  .fixednav_btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0.688rem;
    text-align: left;
    background-color: transparent;
    cursor: pointer;
  }
  .fixednav_btn:hover {
    background-color: var(--c-primary-bg);
  }
  .fixednav_btn-icon {
    display: flex;
    margin: 0;
    color: var(--c-basic-900);
  }
  .fixednav_btn-label {
    display: flex;
    align-self: center;
    margin-left: 0.5rem;
    width: 100%;
    color: var(--c-basic-900);
    font-size: 0.875rem;
    font-weight: 500;
  }
  .fixednav_btn:hover .fixednav_btn-label,
  .fixednav_btn:hover .fixednav_btn-icon {
    color: var(--c-primary);
  }
  .fixednav_link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0.688rem;
    text-align: left;
  }
  .fixednav_link:hover {
    background-color: var(--c-primary-bg);
  }
  .fixednav_link .fixednav_link-icon {
    display: flex;
    margin: 0;
    color: var(--c-basic-900);
  }
  .fixednav_link .fixednav_link-label {
    display: flex;
    align-self: center;
    margin-left: 0.5rem;
    width: 100%;
    color: var(--c-basic-900);
    font-size: 0.875rem;
    font-weight: 500;
  }
  .fixednav_link:hover .fixednav_link-icon,
  .fixednav_link:hover .fixednav_link-label {
    color: var(--c-primary);
  }
</style>
