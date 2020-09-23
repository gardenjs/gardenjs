<script>
  import Link from '../Link.svelte'
  export let node = {} 

  function isLeaf(item) {
    return Array.isArray(item)
  }

</script>
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
