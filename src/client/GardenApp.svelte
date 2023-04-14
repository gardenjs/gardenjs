<script> 
import {initRouter} from './router.js'
import Stage from './components/stage/Stage.svelte'
import Sidebar from './components/sidebar/Sidebar.svelte'
import Topbar from './components/topbar/Topbar.svelte'
import FullScreenLayout from './layouts/FullScreenLayout.svelte'
import LeftRightLayout from './layouts/LeftRightLayout.svelte'
import TopBottomLayout from './layouts/TopBottomLayout.svelte'
import {computeStageStyle} from './logic/stageSizes.js'
import {nodes, rootNodesExpanded, toggleFolder, toggleRootFolders, filterNavtree, updateFilter, updateNavtree, updateRoute} from './logic/navtree.js'

let baseurl = '/garden'
let componentname = ''
let currentRoute = ''

export let routes
export let navtree
export let dasmap 
export let config
$: expressport = config.serverport + 1
$: expressbaseurl = `${window.location.protocol}//${window.location.hostname}:${expressport}/`

$: updateNavtree(navtree)
$: updateRoute(currentRoute, componentname)

let das = {}
let historystate

initRouter(routes, baseurl, (routeobj, state) => {
  if (!routeobj) {
    das = {}
    componentname = ''
  } else {
    componentname = routeobj.fullname
    currentRoute = routeobj.route
    das = dasmap[componentname]
    das.componentfile = routeobj.file
    historystate = state
  }
})

let showSidebar = true
let stageSize = 'full'
let landscape = false
let themes = []
let activeTheme

let stageRect = {
  stageWidth: 900,
  stageHeight: 1000
}

$: stageStyle = computeStageStyle({stageSize, landscape, stageBg: activeTheme?.stageBg})

$: {
  themes = config.themes?.map((theme, index) => ({...theme, active: index === 0})) || []
}

$: {
  activeTheme = themes.find(t => t.active)
}

$: projectTitle = config.project_title || ''

let examples = {}
let selectedStory
$: {
  examples = das.examples || []
  selectedStory = examples[0]?.story 
  if (historystate && historystate.selectedstory) {
    selectedStory = examples.find(ex => ex.story == historystate.selectedstory)?.story
  }
}

function handleTopbarOut(evt) {
  if (evt.detail.openInTab) {
    const targetWindow = window.open('/garden/gardenframe/', '_blank')
    targetWindow.onload = () => {
      targetWindow.postMessage({selectedStory, componentname}, window.location.origin)
    }
  }
  else if (evt.detail.selectTheme) {
    themes = themes.map(theme => ({ ...theme, active: theme.name === evt.detail.selectTheme }))
  }
  else {
    showSidebar = evt.detail.active
    stageSize = evt.detail.stageSize
    landscape = evt.detail.landscape
  }
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
          <Topbar active={showSidebar} themes="{themes}" stageRect={stageRect} stageSize={stageSize} landscape={landscape} on:out={handleTopbarOut} />
          <Stage componentname={componentname} das={das} examples={examples} selectedStory={selectedStory} historystate={historystate} stageStyle={stageStyle} expressbaseurl={expressbaseurl} on:out={handleStageOut} />
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
