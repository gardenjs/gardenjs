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
          <button class="unit-container" title="fold/unfold">
            <span class="unit-label">{key}</span>
            <span class="unit-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 17V7l5 5z"/></svg></span>
          </button>
          <!-- show folder content if class active -->
          <!-- todo: configuration file for garden to define project specific settings? 
          in this case: directories that should be open by default (maybe yaml file?)
          other cases: project logo instead of garden logo ... -->
          <svelte:self node={node[key]} selectedNode={selectedNode} />
        </li>
      {/if}
    {/each}
  </ul>

<style>
ul {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
  margin: 0;
  padding: 0;
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
  margin: 0;
  padding: 0;
  text-align: left;
  background: transparent;
  cursor: pointer;
}
.unit-label {
  display: block;
  padding: 0.25rem 0;
  width: 100%;
  color: var(--c-basic-900);
  font-size: 0.938rem;
  font-weight: 600;
  text-transform: uppercase;
}
.unit-icon {
  display: block;
}
.unit-icon svg {
  fill: var(--c-basic-700);
}
/* just demo, should be class 'active' and not a hover effect */
.unit-container:hover .unit-icon {
  transform: rotate(90deg);
  transition: 0.2s ease-in-out;
}
</style>