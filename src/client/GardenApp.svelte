<script> 
import Stage from './components/stage/Stage.svelte'
import Sidebar from './components/sidebar/Sidebar.svelte'
import Topbar from './components/topbar/Topbar.svelte'
import FullScreenLayout from './layouts/FullScreenLayout.svelte'
import LeftRightLayout from './layouts/LeftRightLayout.svelte'
import TopBottomLayout from './layouts/TopBottomLayout.svelte'
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
  if (routes && dasMap)
    initRouting(dasMap, routes, baseurl)
}
$: updateDasMap(dasMap)
$: setThemes(config.themes)
$: updateSelectedComponent($currentRoute, $componentName)

$: projectTitle = config.project_title || ''

let showSidebar = true
function handleTopbarOut(evt) {
  if (evt.detail.openInTab) {
    const targetWindow = window.open('/garden/gardenframe/', '_blank')
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
          <Sidebar projectTitle={projectTitle} show={showSidebar} rootNodesExpanded={$rootNodesExpanded} nodes={$nodes} filter={$filterNavTree} on:out={handleSidebarOut} />
        </div>
        <div slot="right" class="main">
          <Topbar active={showSidebar} themes="{$themes}" stageRect={stageRect} stageSize={$stageSize} landscape={$landscape} on:out={handleTopbarOut} />
          <Stage componentName={$componentName} das={$das} selectedExample={$selectedExample} stageStyle={$stageStyle} expressbaseurl={expressbaseurl} on:out={handleStageOut} />
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
