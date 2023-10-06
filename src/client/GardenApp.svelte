<script>
  import Stage from './components/stage/Stage.svelte'
  import Sidebar from './components/sidebar/Sidebar.svelte'
  import Topbar from './components/topbar/Topbar.svelte'
  import {updateStage, stageStyle, stageSize, landscape, setThemes, selectTheme, themes} from './logic/stage.js'
  import {nodes, rootNodesExpanded, toggleFolder, toggleRootFolders, filterNavTree, updateFilter, updateNavTree, updateSelectedComponent} from './logic/navTree.js'
  import {initRouting, das, componentName, selectedExample, updateDasMap, currentRoute} from './logic/routing.js'

  let baseurl = '/garden'
  export let routes
  export let navTree
  export let dasMap 
  export let config
  $: expressbaseurl = `${window.location.protocol}//${window.location.hostname}:${config.serverport + 1}/`

  $: updateNavTree(navTree)
  $: {
    if (routes && dasMap) initRouting(dasMap, routes, baseurl)
  }
  $: updateDasMap(dasMap)
  $: setThemes(config.themes)
  $: updateSelectedComponent($currentRoute, $componentName)

  $: projectTitle = config.project_title || ''

  let showSidebar = true
  function handleTopbarOut(evt) {
    if (evt.detail.openInTab) {
      const targetWindow = window.open('/gardenframe/', '_blank')
      targetWindow.onload = () => {
        targetWindow.postMessage({selectedExample: $selectedExample, componentName: $componentName}, window.location.origin)
      }
    }
    else if (evt.detail.selectTheme) {
      selectTheme(evt.detail.selectTheme)
    }
    else {
      showSidebar = evt.detail.active
      updateStage({stageSize: evt.detail.stageSize, landscape: evt.detail.landscape})
    }
  }

let panelHeightNumber = 35
let panelHeight = '35vh'
let stageRect = {}
let topHeight = '65vh'
$: panelExpanded = panelHeightNumber > 0

$: {
  topHeight = `calc(100vh - ${panelHeight} - 3.4rem)`
}
function handleStageOut(evt) {
  if (evt.detail.stageRect) {
    stageRect = evt.detail.stageRect
  }
  if (evt.detail.panelHeight) {
    panelHeightNumber = evt.detail.panelHeight
    panelHeight = panelHeightNumber + 'px'
  }
}

  function handleSidebarOut(evt) {
    if (evt.detail.toggleFoldStatusOfNode) {
      toggleFolder(evt.detail.toggleFoldStatusOfNode)
    }
    if (evt.detail.toggleRootFolders) {
      toggleRootFolders()
    }
    if (evt.detail.filter) {
      updateFilter(evt.detail.filter.value?.toLowerCase())
    }
    if (evt.detail.togglePanel) {
      console.log('toggle panel', panelHeight)
      panelHeightNumber = panelExpanded ? 0 : 35
      panelHeight = panelHeightNumber === 0 ? '0px' : '35vh'
    }
  }

</script>

<div class="garden">
  <div class="sidebar">
    <Sidebar projectTitle={projectTitle} show={showSidebar} rootNodesExpanded={$rootNodesExpanded} nodes={$nodes} filter={$filterNavTree} panelExpanded={panelExpanded} on:out={handleSidebarOut} />
  </div>
  <div class="main">
    <Topbar active={showSidebar} themes="{$themes}" stageRect={stageRect} stageSize={$stageSize} landscape={$landscape} on:out={handleTopbarOut} />
    <Stage componentName={$componentName} das={$das} selectedExample={$selectedExample} stageStyle={$stageStyle} stageSize={$stageSize} topHeight={topHeight} expressbaseurl={expressbaseurl} on:out={handleStageOut} />
  </div>
</div>

<style>
  .sidebar {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .garden {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-grow: 1;
    margin: 0;
    padding: 0 0.375rem;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: var(--c-basic-0);
  }
  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
</style>
