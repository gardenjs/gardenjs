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
        <li class="unit">
          <span class="unit-container" title="fold/unfold">
            <!-- idea: can be folder or link to overview page. therefore unit-label can contain link or "folders"
            if not possible, i will rebuild the unit-container to the whole button to open sub items -->
            <span class="unit-label">{key}</span>
            <!-- end -->
            <button class="unit-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 17V7l5 5z"/></svg></button>
          </span>
          <svelte:self node={node[key]} selectedNode={selectedNode} />
        </li>
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
.unit-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.unit-label {
  display: block;
  padding: 0.25rem 0;
  width: 100%;
}
/* --start: idea: can be folder or link to overview page. therefore unit-label can contain link */
.unit-label a {
  color: var(--c-basic-900);
  text-decoration: none;
  cursor: pointer;
}
/* --end */
.unit-btn {
  display: block;
  margin: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}
/* just demo, should be class 'active' and not hover: */
.unit-btn:hover {
  transform: rotate(90deg);
  transition: 0.2s ease-in-out;
}
</style>