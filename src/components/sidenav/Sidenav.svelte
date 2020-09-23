<script>
import SidenavNode from './SidenavNode.svelte'

export let rootnode = {} 
export let show

</script>

<nav class='sidenav' class:show-sidenav={show}>
  <SidenavNode node={rootnode} />
</nav>

