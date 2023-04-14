<script> 
import Stage from './components/stage/Stage.svelte'
import Sidebar from './components/sidebar/Sidebar.svelte'
import Topbar from './components/topbar/Topbar.svelte'
import FullScreenLayout from './layouts/FullScreenLayout.svelte'
import LeftRightLayout from './layouts/LeftRightLayout.svelte'
import TopBottomLayout from './layouts/TopBottomLayout.svelte'
import {updateStage, stageStyle, stageSize, landscape, setThemes, themes} from './logic/stage.js'
import {nodes, rootNodesExpanded, toggleFolder, toggleRootFolders, filterNavtree, updateFilter, updateNavtree, updateRoute} from './logic/navtree.js'
import {initRouting, das, componentname, currentRoute, selectedExample, updateDasMap} from './logic/routing.js'


let baseurl = '/garden'
export let routes
export let navtree
export let dasmap 
export let config
$: expressbaseurl = `${window.location.protocol}//${window.location.hostname}:${config.serverport + 1}/`

$: updateNavtree(navtree)
$: updateRoute(currentRoute, $componentname)
$: setThemes(config.themes)
$: initRouting(routes, baseurl)
$: updateDasMap(dasmap)

$: projectTitle = config.project_title || ''

let showSidebar = true
function handleTopbarOut(evt) {
  if (evt.detail.openInTab) {
    const targetWindow = window.open('/garden/gardenframe/', '_blank')
    targetWindow.onload = () => {
      targetWindow.postMessage({$selectedExample, $componentname}, window.location.origin)
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

let stageRect = {
  stageWidth: 900,
  stageHeight: 1000
}
function handleStageOut(evt) {
  if (evt.detail.stageRect) {
    stageRect = evt.detail.stageRect
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
}

</script>

<FullScreenLayout>
  <TopBottomLayout>
    <div slot="bottom" class="is-full is-flexgrow">
      <LeftRightLayout>
        <div slot="left" class="is-flexfix">
          <Sidebar projectTitle={projectTitle} show={showSidebar} rootNodesExpanded={$rootNodesExpanded} nodes={$nodes} filter={$filterNavtree} on:out={handleSidebarOut} />
        </div>
        <div slot="right" class="main">
          <Topbar active={showSidebar} themes="{$themes}" stageRect={stageRect} stageSize={$stageSize} landscape={$landscape} on:out={handleTopbarOut} />
          <Stage componentname={$componentname} das={$das} selectedExample={$selectedExample} stageStyle={$stageStyle} expressbaseurl={expressbaseurl} on:out={handleStageOut} />
        </div>
      </LeftRightLayout>
    </div>
  </TopBottomLayout>
</FullScreenLayout>

<style>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
