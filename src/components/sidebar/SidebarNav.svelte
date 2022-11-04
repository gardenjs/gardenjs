<script>
  import Link from './SidebarNavLinks.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let nodes = []
  export let level = 1
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
      <li class="folder" class:unfolded={node.unfolded}>
        <button class="folder_button level-{level}" title="fold/unfold" on:click={() => toggleFolderFoldStatus(node)}>
          <span class="folder_icon" class:unfolded_icon={node.unfolded}><svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 13.084L5 11.917l5-5 5 5-1.167 1.167L10 9.25l-3.833 3.834z"/></svg></span>
          <span class="folder_label">{node.name}</span>
        </button>
        {#if node.unfolded}
          <svelte:self nodes={node.children} level={level + 1} on:out />
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
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  text-align: left;
  border-left: 3px solid transparent;
  cursor: pointer;
}
.folder_button:hover {
  border-left: 3px solid var(--c-primary);
}
.folder_label {
  display: flex;
  align-self: center;
  order: 1;
  width: 100%;
  color: var(--c-basic-900);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 1px;
}
.folder_icon {
  display: flex;
  order: 2;
  width: 1.25rem;
  height: 1.25rem;
  transition: 0.2s;
  margin-left: 0.25rem;
  margin-right: 0;
}
.folder_icon svg {
  fill: var(--c-basic-700);
}
.folder_icon.unfolded_icon {
  transform: rotate(180deg);
  transition: 0.2s;
}


.level-1 {
  background: transparent;
}
.level-1:hover {
  background-color: var(--c-basic-150);
}
.level-1 .folder_icon {
  margin-left: 0;
  margin-right: 0.25rem;
}
.level-1 .folder_label {
  order: 2;
}
.level-1 .folder_icon {
  order: 1;
}
/* level 2 */
.level-2 {
  padding-left: 2.125rem;
  background-color: var(--c-basic-100);
}
.unfolded .level-2 {
  background-color: var(--c-basic-150);
}
.level-2:hover {
  background-color: var(--c-basic-200);
}
/* level 3 */
.level-3 {
  padding-left: 2.75rem;
  background-color: var(--c-basic-100); 
}
.level-3 .folder_label {
  font-size: 0.813rem;
}
.unfolded .level-3 {
  background-color: var(--c-basic-200);
}
.level-3:hover {
  background-color: var(--c-basic-250);
}
</style>
