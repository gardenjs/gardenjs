<script>
  import SidebarNav from './SidebarNav.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  
  export let nodes = []
  export let show
  export let rootNodesExpanded = true
  export let projectTitle
  export let filter
  
  function toggleRootFolders() {
    dispatch('out', {toggleRootFolders: true})
  }

  function updateFilter(event) {
    dispatch('out', {filter: {value : event.target.value}})
  }
  
  </script>
  
  <div class="sidebar" class:show-sidebar={show}>
    <a class="project_title" href="/garden/">
      <span>{projectTitle}</span>
    </a>
    <nav>
      <ul>
        <li class="search">
          <div class="searchfield">
            <input class="searchfield_input" type="text" value={filter || ''} placeholder="Filter" on:input={updateFilter}>
            <!-- <button class="searchfield_submit" title="send search request"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button> -->
          </div>
        </li>
        {#if nodes.length == 0 && filter}
        <li>
          <div class="nosearchresult">No results for '{filter}'</div>
        </li>
        {:else}
          <SidebarNav nodes={nodes} on:out />
        {/if}
      </ul>
      <ul class="fixed_links">
        <li>
          <button class="collapse_btn" title={rootNodesExpanded ? 'Collapse' : 'Restore'} on:click={toggleRootFolders}>
            <span>
              {#if rootNodesExpanded}
                <svg class="collapse_icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20l5-5 5 5M7 4l5 5 5-5"/></svg>
              {:else}
                <svg class="collapse_icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
              {/if}
            </span>
            <span class="collapse_label">{rootNodesExpanded ? 'Collapse' : 'Expand'} Navigation</span>
          </button>
        </li>
        <li>
          <a class="docs" href="https://github.com/rabbitdevelopment/garden" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"/></svg>
            <span>Garden Docs</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  
  <style>
  .sidebar {
    position: relative;
    width: 0;
    max-width: 260px;
    height: calc(100vh - 0.75rem);
    background-color: var(--c-basic-100);
    border-radius: 0.75rem;
    transition: width 0.2s;
    overflow-x: hidden;
  }
  .show-sidebar {
    margin-right: 0.375rem;
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
    width: 260px;
    --h-project-title: 2.75rem;
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
  .search {
    height: 2rem;
    overflow: hidden;
  }
  .searchfield {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.5rem;
    height: 2rem;
  }
  .searchfield_input {
    padding: 0.125rem 0.125rem 0.125rem 0.688rem;;
    width: 100%;
    height: 100%;
    color: var(--c-basic-900);
    background-color: var(--c-base-0);
    border: 1px solid var(--c-basic-250);
  }
  .searchfield_input::placeholder {
    font-size: 0.813rem;
    color: var(--c-basic-700);
  }
  .searchfield_input:focus {
    outline: none;
  }
  /* .searchfield_submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 100%;
    background-color: var(--c-basic-150);
    border: none;
    cursor: pointer;
  }
  .searchfield_submit:hover {
    background-color: var(--c-primary-bg);
  }
  .searchfield_submit svg {
    color: var(--c-basic-900);
  }
  .searchfield_submit:hover svg {
    color: var(--c-primary);
  } */
  .nosearchresult {
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
  nav {
    width: 260px;
    height: calc(100vh - 56px);
    overflow-y: auto;
  }
  .fixed_links {
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
  .collapse_btn {
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
  .collapse_btn:hover {
    background-color: var(--c-primary-bg);
  }
  .collapse_icon {
    display: flex;
    margin: 0;
    color: var(--c-basic-900);
  }
  .collapse_label {
    display: flex;
    align-self: center;
    margin-left: 0.5rem;
    width: 100%;
    color: var(--c-basic-900);
    font-size: 0.875rem;
    font-weight: 500;
  }
  .collapse_btn:hover .collapse_label,
  .collapse_btn:hover .collapse_icon {
    color: var(--c-primary);
  }
  .docs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0.688rem;
    text-align: left;
  }
  .docs:hover {
    background-color: var(--c-primary-bg);
  }
  a.docs svg {
    display: flex;
    margin: 0;
    color: var(--c-basic-900);
  }
  a.docs span {
    display: flex;
    align-self: center;
    margin-left: 0.5rem;
    width: 100%;
    color: var(--c-basic-900);
    font-size: 0.875rem;
    font-weight: 500;
  }
  .docs:hover svg,
  .docs:hover span {
    color: var(--c-primary);
  }
  </style>
  
