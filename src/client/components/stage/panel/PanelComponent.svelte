<script>
  import { run } from 'svelte/legacy'

  import TabContent from './PanelContent.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  /**
   * @typedef {Object} Props
   * @property {any} [tabs]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { tabs = [], children } = $props()

  let selectedTabName = $state({})
  let selectedTab = $state()
  run(() => {
    if (tabs) {
      selectedTab = tabs.find((t) => t.name === selectedTabName) || tabs[0]
    } else {
      selectedTab = {}
    }
  })

  const handleSelect = (tab) => () => {
    selectedTabName = tab.name
    dispatch('out', { selecteditem: tab })
  }

  function handleCollapsePanel() {
    dispatch('out', { toggleExpandPanel: true })
  }

  function handleout(evt) {
    if (selectedTab.out) {
      selectedTab.out(evt)
    }
  }
</script>

<div class="panel_container">
  {#if tabs.length}
    <div class="panel_nav">
      <nav>
        <ul>
          {#each tabs as tab (tab.name)}
            <li>
              <button
                class:active={tab.name === selectedTab.name}
                onclick={handleSelect(tab)}
                >{tab.name}<span class="dot"></span></button
              >
            </li>
          {/each}
        </ul>
      </nav>
      <button
        class="panel_toggle"
        title="Collapse panel"
        onclick={handleCollapsePanel}
      >
        <span class="is-hidden">Collapse panel</span>
        <svg
          class="controls_btn-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line
            x1="3"
            x2="21"
            y1="15"
            y2="15"
          /><path d="m15 8-3 3-3-3" /></svg
        >
      </button>
    </div>
    <div class="panel_pane">
      {#if selectedTab && selectedTab.page}
        <TabContent item={selectedTab} on:out={handleout} />
      {:else if children}{@render children()}{:else}No tab content provided{/if}
    </div>
  {/if}
</div>

<style>
  :root {
    --h-panelnav: 2.375rem;
  }
  .panel_container {
    position: relative;
    overflow: hidden;
    flex: 1;
    height: 100%;
  }
  .panel_nav {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--h-panelnav);
    background-color: var(--c-basic-75);
    border-bottom: 1px solid var(--c-bg-body);
    overflow-x: auto;
  }
  .panel_nav nav {
    margin: 0 1.25rem 0 0;
  }
  .panel_nav nav ul {
    display: flex;
    overflow-x: auto;
  }
  .panel_nav nav li button {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1.25rem;
    height: calc(var(--h-panelnav) - 1px);
    font-size: 0.875rem;
    color: var(--c-basic-700);
    white-space: nowrap;
    text-transform: capitalize;
    overflow: hidden;
  }
  .panel_nav nav li button .dot {
    display: block;
    width: 0.313rem;
    height: 0.313rem;
    background-color: transparent;
    border-radius: 50%;
  }
  .panel_nav nav li button.active .dot {
    background-color: var(--c-primary);
  }
  .panel_nav nav li button:hover,
  .panel_nav nav li button:focus-visible {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-basic-100);
  }
  .panel_nav nav li button:focus-visible {
    background-color: var(--c-basic-150);
  }
  .panel_nav nav li button.active {
    color: var(--c-primary);
    font-weight: 500;
    background-color: var(--c-primary-bg);
  }
  .panel_toggle {
    padding: 0 0.75rem;
    height: 100%;
    background: none;
  }
  .is-hidden {
    position: absolute !important;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
  }
  .panel_toggle svg {
    margin-top: 0.188rem;
    height: 1.375rem;
    color: var(--c-basic-700);
  }
  .panel_toggle:hover svg,
  .panel_toggle:focus-visible svg {
    color: var(--c-primary);
  }
  .panel_toggle:focus-visible {
    background-color: var(--c-basic-150);
  }
  .panel_pane {
    position: absolute;
    top: var(--h-panelnav);
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1.25rem;
    width: 100%;
    overflow-y: auto;
  }
</style>
