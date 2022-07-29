<script>
  import Link from './SidebarNavLinks.svelte'
  export let node = {} 
  export let selectedNode

  function isLeaf(item) {
    return Array.isArray(item)
  }

</script>
  <ul>
    {#each Object.keys(node) as key}
      {#if isLeaf(node[key])}
        {#each node[key] as item}
        <li>
          <Link href={item.href} selected="{item.key === selectedNode}">{item.text}</Link>
        </li>
        {/each}
      {:else}
        <span class="unit">
          <li class="folder">
            <button class="folder-btn" title="fold/unfold">
              <span class="folder-label">{key}</span><span class="folder-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M9.4 18L8 16.6l4.6-4.6L8 7.4 9.4 6l6 6z"/></svg></span>
            </button>
            <svelte:self node={node[key]} selectedNode={selectedNode} />
          </li>
        </span>
      {/if}
    {/each}
  </ul>

<style>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul li {
  list-style: none;
  margin: 0;
  color: var(--c-basic-900);
  font-size: 0.938rem;
  font-weight: 600;
  text-transform: uppercase;
}
.unit {
  display: block;
  margin: 0.5rem 0 1.5rem 1rem;
}
.folder {
  margin: 0.5rem 0 0;
}
.folder-btn {
  display: flex;
  background: transparent;
  padding: 0;
  cursor: pointer;
  height: 24px;
}
.folder-label {
  display: flex;
  align-self: center;
}
.folder-icon {
  margin: 0 0 0 0.5rem;
}
.folder-btn:hover > .folder-icon {
  transform: rotate(90deg);
  transition: 0.2s ease-in-out;
}
</style>