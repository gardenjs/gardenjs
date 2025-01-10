<script>
  import SidebarNav from './SidebarNav.svelte'
  import Link from './SidebarNavLinks.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  /**
   * @typedef {Object} Props
   * @property {any} [nodes]
   * @property {number} [level]
   */

  /** @type {Props} */
  let { nodes = [], level = 1 } = $props()

  function toggleFoldStatusOfNode(node) {
    dispatch('out', { toggleFoldStatusOfNode: { ...node } })
  }
</script>

<ul class="filter_list components level-{level}">
  {#each nodes as node}
    {#if node.isLeaf}
      <li class="component">
        <Link href={node.href} selected={node.selected} text={node.name} />
      </li>
    {:else}
      <!-- prettier-ignore -->
      <li class="folder" class:unfolded={node.unfolded}>
        <button class="folder_btn btn_level-{level}" title={node.unfolded ? 'fold' : 'unfold'} onclick={() => toggleFoldStatusOfNode(node)}>
          <span class="folder_arrow" class:unfolded_icon={node.unfolded}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
          </span>
          <span class="folder_icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 24 24" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7.93a2 2 0 01-1.66-.9l-.82-1.2A2 2 0 007.93 3H4a2 2 0 00-2 2v13c0 1.1.9 2 2 2z" /></svg>
          </span>
          <span class="folder_label">
            <!-- eslint-disable-next-line -->
            {@html node.name}
          </span>
        </button>
        {#if node.unfolded}
          <SidebarNav nodes={node.children} level={level + 1} on:out />
        {/if}
      </li>
    {/if}
  {/each}
</ul>

<style>
  .components {
    margin-left: 1.063rem;
    border-left: 1px solid var(--c-basic-250);
  }
  .component {
    height: 1.375rem;
  }
  .level-1 {
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
  }
  .folder {
    display: block;
    margin: 0;
  }
  .folder_btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0.688rem 0.375rem 0.688rem;
  }
  .folder_label {
    display: flex;
    width: 100%;
    font-size: 0.813rem;
    color: var(--c-basic-900);
    font-weight: 600;
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
  }
  .folder_btn:hover {
    background-color: var(--c-basic-100);
  }
  .folder_btn:hover .folder_label {
    color: var(--c-primary);
  }
  .folder_btn:focus-visible {
    color: var(--c-primary);
    outline: none;
    background-color: var(--c-basic-100);
  }
  .folder_arrow {
    display: flex;
    align-items: center;
    width: 0.938rem;
    height: 1.25rem;
    transition: 0.2s;
    margin-right: 0.375rem;
    color: var(--c-basic-900);
  }
  .folder_arrow.unfolded_icon {
    transform: rotate(180deg);
    transition: 0.2s;
  }
  .folder_icon {
    display: flex;
    align-items: center;
    margin-right: 0.375rem;
    color: var(--c-primary);
  }
  .btn_level-3 .folder_label {
    font-size: 0.813rem;
  }
  .filter_list :global(.highlight) {
    padding: 0 0.125rem;
    color: var(--c-primary);
    font-weight: 700;
  }
</style>
