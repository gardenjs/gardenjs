<script>
  import Bookmarks from './Bookmarks.svelte'
  import SidebarNav from './SidebarNav.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  /**
   * @typedef {Object} Props
   * @property {any} [nodes]
   * @property {boolean} [sidebarExpanded]
   * @property {boolean} [rootNodesExpanded]
   * @property {any} projectTitle
   * @property {any} projectLogo
   * @property {any} projectLogoDarkmode
   * @property {any} filter
   * @property {boolean} [panelExpanded]
   * @property {any} docsLink
   * @property {any} appTheme
   * @property {any} [bookmarks]
   */

  /** @type {Props} */
  let {
    nodes = [],
    sidebarExpanded = true,
    rootNodesExpanded = true,
    projectTitle,
    projectLogo,
    projectLogoDarkmode,
    filter,
    panelExpanded = true,
    docsLink,
    appTheme,
    bookmarks = [],
  } = $props()

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

<header class="sidebar_container" class:show-sidebar={sidebarExpanded}>
  <a class="project-identifier" class:has-logo={projectLogo} href="/">
    {#if projectLogoDarkmode && appTheme === 'dark'}
      <img
        src="/assets/{projectLogoDarkmode}"
        title="start"
        alt="{projectTitle} logo"
      />
    {:else if projectLogo}
      <img
        src="/assets/{projectLogo}"
        title="start"
        alt="{projectTitle} logo"
      />
    {:else}
      <span>{projectTitle}</span>
    {/if}
  </a>
  <div class="filter">
    <input
      aria-autocomplete="list"
      id="filter"
      class="filter_input"
      autocomplete="off"
      type="search"
      value={filter || ''}
      placeholder="Filter..."
      oninput={updateFilter}
    />
  </div>
  {#if nodes.length == 0 && filter}
    <div>
      <div class="filter_zero-results">No results for '{filter}'</div>
    </div>
  {:else}
    {#if bookmarks.length > 0}
      <Bookmarks {bookmarks} on:out />
    {/if}
    <nav class="components-nav">
      <SidebarNav {nodes} on:out />
    </nav>
  {/if}
  <nav class="controls">
    <!-- prettier-ignore -->
    <ul>
      <li>
        <button class="controls_btn" title={rootNodesExpanded ? 'Collapse' : 'Restore'} onclick={toggleRootFolders}>
          {#if rootNodesExpanded}
            <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20l5-5 5 5M7 4l5 5 5-5" /></svg>
          {:else}
            <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5" /></svg>
          {/if}
          <span class="controls_btn-label">{rootNodesExpanded ? 'Collapse' : 'Expand'} Navigation</span>
        </button>
      </li>
      <li>
        <button class="controls_btn" title={panelExpanded ? 'Collapse' : 'Restore'} onclick={toggleExpandPanel}>
          {#if panelExpanded}
            <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="15" y2="15" /><path d="m15 8-3 3-3-3" /></svg>
          {:else}
            <svg  class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="15" y2="15"/><path d="m9 10 3-3 3 3" /></svg>
          {/if}
          <span class="controls_btn-label">{panelExpanded ? 'Collapse' : 'Expand'} Panel</span>
        </button>
      </li>
      {#if docsLink === 1}
        <li>
          <a class="controls_btn" href="https://gardenjs.org/docs" target="_blank" rel="noreferrer">
            <svg class="controls_btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"/></svg>
            <span class="controls_btn-label">Gardenjs Docs</span>
          </a>
        </li>
      {/if}
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
  .project-identifier {
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
    inline-size: var(--w-sidebar);
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.25rem;
    color: var(--c-primary);
    text-decoration: none;
    font-weight: 900;
    line-height: 1;
  }
  .project-identifier.has-logo {
    height: auto;
  }
  .project-identifier:focus-visible {
    color: var(--c-basic-500);
  }
  .project-identifier span {
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
  input.filter_input[type='search'] {
    font-size: 0.813rem;
  }
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  .filter_input::placeholder {
    font-size: 0.813rem;
    color: var(--c-basic-500);
  }
  /* same styles as the input in the topbar: */
  .filter_input:focus-visible {
    background-color: var(--c-primary-bg);
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
  .components-nav {
    display: flex;
    flex-shrink: 1;
    overflow: hidden;
    visibility: visible;
    width: var(--w-sidebar);
    overflow-y: auto;
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
  .controls_btn:focus-visible {
    background-color: var(--c-basic-100);
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
  .controls_btn:focus-visible .controls_btn-label,
  .controls_btn:hover .controls_btn-icon,
  .controls_btn:focus-visible .controls_btn-icon {
    color: var(--c-primary);
  }
</style>
