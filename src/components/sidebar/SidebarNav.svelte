<script>
  import Link from './SidebarNavLinks.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let nodes = []

  function toggleFolderFoldStatus(node) {
    dispatch('out', {toggleFolderFoldStatus: {...node}})
  }

</script>
<ul>
  {#each nodes as node }
    {#if node.isLeaf}
      <li>
        <Link href={node.href} selected="{node.selected}">{node.name}</Link>
      </li>
    {:else}
      <li class="folder">
        <button class="folder-button" title="fold/unfold" on:click={() => toggleFolderFoldStatus(node)}>
          <span class="folder-label">{node.name}</span>
          <span class="folder-icon" class:unfolded={node.unfolded}><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M7.4 15.375l-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6z"/></svg>
        </button>
        {#if node.unfolded}
          <svelte:self nodes={node.children} on:out />
        {/if}
      </li>
    {/if}
  {/each}
</ul>

<style>
.folder {
  display: block;
  margin: 0.5rem 0 1.5rem 1rem;
}
.folder-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
  background: transparent;
  cursor: pointer;
}
.folder-label {
  display: flex;
  align-self: center;
  width: 100%;
  color: var(--c-basic-900);
  font-size: 0.938rem;
  font-weight: 600;
  text-transform: uppercase;
}
.folder-icon {
  display: block;
  height: 100%;
}
.folder-icon svg {
  fill: var(--c-basic-700);
}
.folder-icon.unfolded {
  transform: rotate(180deg);
}
</style>
