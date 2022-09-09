<script>
  import Link from './SidebarNavLinks.svelte'
  export let node = {} 
  export let selectedNode

  function isLeaf(item) {
    return Array.isArray(item)
  }

  function toggleFolderStatus(key) {
    console.log('TOGOGLE')
    node[key].__unfolded = !node[key].__unfolded
  }

</script>
  <ul>
    {#each Object.keys(node).filter(key => key !== '__unfolded') as key}
      {#if isLeaf(node[key])}
        {#each node[key] as item}
        <li>
          <Link href={item.href} selected="{item.key === selectedNode}">{item.text}</Link>
        </li>
        {/each}
      {:else}
        <li class="folder">
          <button class="folder-button" title="fold/unfold" on:click={() => toggleFolderStatus(key)}>
            <span class="folder-label">{key}</span>
            <span class="folder-icon" class:unfolded={node[key].__unfolded}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 17V7l5 5z"/></svg></span>
          </button>
          {#if node[key].__unfolded}
            <svelte:self node={node[key]} selectedNode={selectedNode} />
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
  transform: rotate(90deg);
}
</style>
