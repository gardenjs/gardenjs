<script>
  import Link from './SidebarNavLink.svelte'
  export let node = {} 

  function isLeaf(item) {
    return Array.isArray(item)
  }

</script>
<nav>
  <ul>
    {#each Object.keys(node) as key}
      {#if isLeaf(node[key])}
        {#each node[key] as item}
        <li>
          <Link href={item.href}>{item.text}</Link>
        </li>
        {/each}
      {:else}
        <li>
          {key}
          <svelte:self node={node[key]} />
        </li>
      {/if}
    {/each}
  </ul>
</nav>

<style>
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  list-style: none;
  margin: 0.25rem 0;
  padding: 0.5rem 0;
  color: var(--c-basic-900);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}
nav ul li ul {
  padding: 0 0 0 1rem;
}
</style>