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
            <span class="folder-label">{key}</span>
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
  font-size: 0.813rem;
  font-weight: 600;
  text-transform: uppercase;
}
.unit {
  display: block;
  margin: 0.5rem 0 1.5rem 1rem;
}
.folder {
  margin: 0.5rem 0 1rem;
}
.folder-label {
  display: block;
  padding: 0 0 0.5rem;
}
</style>
