<script>
  import SidebarNav from './SidebarNav.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  
  export let nodes = []
  export let show
  export let rootNodesExpanded = true
  export let projectTitle
  
  function toggleRootFolders() {
    dispatch('out', {toggleRootFolders: true})
  }
  
  </script>
  
  <div class="sidebar" class:show-sidebar={show}>
    <a class="project_title" href="/garden/">
      <span>{projectTitle}</span>
    </a>
    <nav>
      <ul>
        <li class="search">
          <form id="search" class="searchform" method="post" action="">
            <input class="searchform_input" type="text" name="" value="" placeholder="filter">
            <button id="searchform_submit" class="searchform_submit" name="search[submitButton]" title="send search request"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></button>
          </form>
        </li>
        <li>
          <button class="collapse_button" title="fold/unfold all" on:click={toggleRootFolders}>
            <span class="collapse_label">Collapse Navigation</span>
            <span>
              {#if rootNodesExpanded}
                <svg class="collapse_icon" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
              {:else}
                <svg class="collapse_icon" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20l5-5 5 5M7 4l5 5 5-5"/></svg>
              {/if}
            </span>
          </button>
        </li>
      </ul>
      <SidebarNav nodes={nodes} on:out />
      <ul>
        <li>
          <a class="github" href="https://github.com/rabbitdevelopment/garden" target="_blank" rel="noreferrer">
            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11.999.296C5.373.296 0 5.67 0 12.296c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.579 0-.284-.01-1.04-.017-2.04-3.337.725-4.042-1.61-4.042-1.61C4.422 18.07 3.635 17.7 3.635 17.7c-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.833 2.81 1.304 3.493.997.109-.775.418-1.304.762-1.604-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.468-2.381 1.236-3.22-.124-.304-.536-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.473 11.473 0 0112 6.1a11.51 11.51 0 013.005.403c2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.769.839 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.479 5.921.431.37.815 1.103.815 2.223 0 1.604-.015 2.898-.015 3.291 0 .321.216.695.825.578 4.765-1.59 8.2-6.085 8.2-11.385 0-6.628-5.373-12-12.001-12"/></svg>
            <span>Documentation</span>
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
    height: 100vh;
    overflow-x: hidden;
    background-color: var(--c-basic-50);
    border-right: 1px solid var(--c-basic-300);
    transition: width 0.2s;
  }
  .show-sidebar {
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
    height: 2.75rem;
    inline-size: 260px; 
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.25rem;
    color: var(--c-primary);
    text-decoration: none;
    font-weight: 900;
    line-height: 1;
    border-bottom: 1px solid var(--c-basic-300);
  }
  .project_title span {
    overflow: hidden;
  }
  nav {
    width: 260px;
    height: calc(100vh - 44px);
    overflow-y: auto;
  }
  .search {
    height: 2rem;
    padding: 0 0 0 0.688rem;
    border-bottom: 1px solid var(--c-basic-300);
    overflow: hidden;
  }
  .searchform {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .searchform_input {
    padding: 0.125rem;
    width: calc(100% - 2.5rem);
    height: 2rem;
    border: none;
  }
  .searchform_input::placeholder {
    font-size: 0.813rem;
    color: var(--c-basic-500);
  }
  .searchform_input:focus {
    outline: none;
  }
  .searchform_submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2rem;
    background-color: var(--c-basic-150);
    border: none;
    cursor: pointer;
  }
  .searchform_submit svg {
    color: var(--c-primary);
  }
  .collapse_button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 2rem;
    margin: 0;
    padding: 0 0.688rem;
    text-align: left;
    background-color: transparent;
    border-bottom: 1px solid var(--c-basic-300);
    cursor: pointer;
  }
  .collapse_button:hover {
    background-color: var(--c-basic-150);
  }
  .collapse_label {
    display: flex;
    align-self: center;
    width: 100%;
    color: var(--c-basic-900);
    font-size: 0.75rem;
  }
  .collapse_icon {
    display: flex;
    order: 2;
    width: 1rem;
    height: 1rem;
    transition: 0.2s;
    margin-left: 0;
    color: var(--c-basic-900);
  }
  .github {
    display: inline-flex;
    justify-content: center;
    align-items: center; 
    margin: 1rem 0;
    padding: 0.5rem 0.5rem 0.5rem 0.688rem;
  }
  a.github svg {
    display: block;
    fill: var(--c-basic-900);
  }
  a.github span {
    display: block;
    margin-left: 0.5rem;
    color: var(--c-basic-900);
    font-size: 0.75rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    border-bottom: 1px solid var(--c-basic-900);
  }
  a.github:hover span {
    border-color: transparent;
  }
  </style>
  
