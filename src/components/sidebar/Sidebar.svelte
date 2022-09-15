<script>
import SidebarNav from './SidebarNav.svelte'

export let nodes = []
export let show

</script>

<div class="sidebar" class:show-sidebar={show}>
  <div class="unfold_all">
    <button title="fold/unfold all">
      <span class="project_name">Application Name</span>
      <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 11.323L5 12.49l5 5 5-5-1.167-1.167L10 15.157l-3.833-3.834zm0-2.631L5 7.525l5-5 5 5-1.167 1.167L10 4.858 6.167 8.692z"/></svg></button>
    <!-- collapse icon:
      <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 17.49L5 16.323l5-5 5 5-1.167 1.167L10 13.656 6.167 17.49zm0-14.965L5 3.692l5 5 5-5-1.167-1.167L10 6.359 6.167 2.525z"/></svg>
    -->
  </div>
  <nav><SidebarNav nodes={nodes} on:out /></nav>
</div>

<style>
.sidebar {
  position: relative;
  width: 0;
  max-width: 260px;
  height: calc(100vh - 2.75rem);
  overflow-x: hidden;
  background-color: var(--c-basic-100);
  padding: 0;
  transition: width 0.2s;
}
a.logo {
  display: block;
  width: 260px;
  margin: 1rem 0;
  text-decoration: none;
}
.logo svg {
  display: block;
  margin: auto;
}
.show-sidebar {
  width: 260px;
}
.unfold_all button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin: 0;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  font-size: 0.938rem;
  color: #fff;
  font-weight: 800;
  background-color: var(--c-basic-500);
  border: none;
  cursor: pointer;
}
.unfold_all svg {
  fill: var(--c-basic-700);
  fill: #fff
}
.unfold_all button:hover {
  background-color: var(--c-basic-400);
}
nav {
  width: 260px;
  overflow-y: auto;
}
</style>
