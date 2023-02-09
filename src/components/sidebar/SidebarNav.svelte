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

<ul class="list list_level-{level}">
  {#each nodes as node }
    {#if node.isLeaf}
      <li>
        <Link href={node.href} selected={node.selected} level={level}>{node.name}</Link>
      </li>
    {:else}
      <li class="folder" class:unfolded={node.unfolded}>
        <button class="folder_button btn_level-{level}" title="fold/unfold" on:click={() => toggleFolderFoldStatus(node)}>
          <span class="folder_icon" class:unfolded_icon={node.unfolded}><svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 24 24"  height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg></span>
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
.list_level-1 {
  padding-bottom: 0.75rem;
  border: none;
  border-bottom: 1px solid var(--c-basic-300);
}
.folder {
  display: block;
  margin: 0;
  background-color: transparent;
}
.folder_button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0.5rem 0.688rem 0.375rem 0.688rem;
  text-align: left;
  color: var(--c-basic-900);
  background-color: transparent;
  cursor: pointer;
}
.folder_label {
  display: flex;
  align-self: center;
  order: 1;
  width: 100%;
  color: var(--c-basic-600);
  font-size: 0.813rem;
  font-weight: 500;
  text-transform: uppercase;
}
.folder_button:hover .folder_label {
  color: var(--c-basic-900);
}
.folder_icon {
  display: flex;
  justify-items: center;
  align-items: center;
  order: 2;
  width: 0.938rem;
  height: 1.25rem;
  transition: 0.2s;
  margin-left: 0.25rem;
  margin-right: 0;
}
.folder_icon svg {
  color: var(--c-basic-700);
}
.folder_icon.unfolded_icon {
  transform: rotate(180deg);
  transition: 0.2s;
}
.btn_level-1 .folder_icon {
  margin-left: 0;
  margin-right: 0.25rem;
}
.btn_level-1 .folder_label {
  order: 2;
}
.btn_level-1 .folder_icon {
  order: 1;
}
.btn_level-2 {
  padding-left: 2rem;
}
.btn_level-3 {
  padding-left: 3rem;
}
.btn_level-3 .folder_label {
  font-size: 0.813rem;
}
</style>
