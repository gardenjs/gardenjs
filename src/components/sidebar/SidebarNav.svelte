<script>
  import Link from './SidebarNavLinks.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let nodes = []

  function toggleFolderFoldStatus(node) {
    dispatch('out', {toggleFolderFoldStatus: {...node}})
  }

</script>
<ul class="sidebarnav">
  {#each nodes as node }
    {#if node.isLeaf}
      <li>
        <Link href={node.href} selected="{node.selected}">{node.name}</Link>
      </li>
    {:else}
      <li class="folder" class:unfolded={node.unfolded}>
        <button class="folder_button" title="fold/unfold" on:click={() => toggleFolderFoldStatus(node)}>
          <span class="folder_icon" class:unfolded_icon={node.unfolded}><svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 13.084L5 11.917l5-5 5 5-1.167 1.167L10 9.25l-3.833 3.834z"/></svg></span>
          <span class="folder_label">{node.name}</span>
        </button>
        {#if node.unfolded}
          <svelte:self nodes={node.children} on:out />
        {/if}
      </li>
    {/if}
  {/each}
</ul>

<style>
/* some styles for deeper levels in sidebar.css... */
.folder {
  display: block;
  margin: 0;
  background-color: transparent;
  border-bottom: 1px solid var(--c-basic-300)
}
.folder.unfolded:last-of-type {
  border: none;
}
.folder.unfolded {
  background-color: var(--c-basic-100);
}
.folder_button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  text-align: left;
  background: transparent;
  border-left: 3px solid transparent;
  cursor: pointer;
}
.folder_button:hover {
  border-left: 3px solid var(--c-basic-500);
  background-color: var(--c-basic-150);
}
.folder_label {
  display: flex;
  align-self: center;
  width: 100%;
  padding-left: 0.25rem;
  color: var(--c-basic-900);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 1px;
}
.folder_icon {
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  transition: 0.2s;
}
.folder_icon svg {
  fill: var(--c-basic-700);
}
.folder_icon.unfolded_icon {
  transform: rotate(180deg);
  transition: 0.2s;
}
</style>
