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
  <a class="github" href="https://github.com/rabbitdevelopment/garden">
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.999.296C5.373.296 0 5.67 0 12.296c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.579 0-.284-.01-1.04-.017-2.04-3.337.725-4.042-1.61-4.042-1.61C4.422 18.07 3.635 17.7 3.635 17.7c-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.833 2.81 1.304 3.493.997.109-.775.418-1.304.762-1.604-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.468-2.381 1.236-3.22-.124-.304-.536-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.473 11.473 0 0112 6.1a11.51 11.51 0 013.005.403c2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.769.839 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.479 5.921.431.37.815 1.103.815 2.223 0 1.604-.015 2.898-.015 3.291 0 .321.216.695.825.578 4.765-1.59 8.2-6.085 8.2-11.385 0-6.628-5.373-12-12.001-12"/></svg>
    <span>Documentation</span>
  </a>
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
  font-weight: 500;
  text-transform: uppercase;
  background-color: var(--c-basic-500);
  border: none;
  cursor: pointer;
}
.unfold_all svg {
  fill: #fff
}
.unfold_all button:hover {
  background-color: var(--c-basic-400);
}
nav {
  width: 260px;
  height: calc(100vh - 120px);
  overflow-y: auto;
}
.github {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0 0.5rem 1rem;
  text-decoration: none;
}
.github svg {
  fill: var(--c-basic-900);
}
.github span {
  margin-left: 0.75rem;
  color: var(--c-basic-900);
  border-bottom: 1px solid var(--c-basic-900);
}
</style>
