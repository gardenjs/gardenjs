<script> 
import {initRouter} from '../src/router.js'
import Stage from './components/stage/Stage.svelte'
import Sidebar from './components/sidebar/Sidebar.svelte'
import Topbar from '../src/components/topbar/Topbar.svelte'
import FullScreenLayout from '../src/layouts/FullScreenLayout.svelte'
import LeftRightLayout from '../src/layouts/LeftRightLayout.svelte'
import TopBottomLayout from '../src/layouts/TopBottomLayout.svelte'

let baseurl = '/garden'
let componentname = ''
let currentRoute = ''

export let routes
export let navtree
export let dasmap 

let das = {}
let historystate

initRouter(routes, baseurl, (routeobj, state) => {
  if (!routeobj) {
    das = {}
    componentname = ''
  } else {
    componentname = routeobj.fullname
    currentRoute = routeobj.route
    das = dasmap[componentname] || {}
    historystate = state
  }
})

let showSidebar = true
let stageSize = 'full'
let landscape = false
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
      targetWindow.postMessage({selectedStory, componentname}, window.location)
    }
  }
  else {
    showSidebar = evt.detail.active
    stageSize = evt.detail.stageSize
    landscape = evt.detail.landscape
  }
}

function handleSidebarOut(evt) {
  if (evt.detail.toggleFolderFoldStatus) {
    const node = evt.detail.toggleFolderFoldStatus
    if (unfoldedNodes[node.key]) {
      unfoldedNodes[node.key] = false
    } else {
      unfoldedNodes[node.key] = true
    }
    unfoldedNodes = unfoldedNodes
  }
}

let unfoldedNodes = {}

let nodes = []
$: {
  nodes = transformNavTree(currentRoute, componentname,  unfoldedNodes, navtree)
}

function transformNavTree(route, selectedNode,  unfoldedNodes, nodes) {
  return nodes.map(child => {
    if (child.isLeaf) {
      return {...child, selected: selectedNode === child.key, isLeaf: true}
    } else {
      return {...child, children: transformNavTree(currentRoute, selectedNode, unfoldedNodes, child.children), unfolded: isUnfolded(child, route) }
    }
  })
}

function isUnfolded(node, route) {
  return unfoldedNodes[node.key] || route.indexOf(node.key) === 0
}

</script>

<FullScreenLayout>
  <TopBottomLayout>
    <div slot="top" class="is-flexfix">
      <Topbar active={showSidebar} stageSize={stageSize} landscape={landscape} on:out={handleTopbarOut} />
    </div>
    <div slot="bottom" class="is-full is-flexgrow">
      <LeftRightLayout>
        <div slot="left" class="is-flexfix">
          <Sidebar show={showSidebar} nodes={nodes} on:out={handleSidebarOut} />
        </div>
        <div slot="right" class="main">
          <Stage componentname={componentname} das={das} examples={examples} selectedStory={selectedStory} historystate={historystate} 
          stageSize={stageSize} landscape={landscape}/>
        </div>
      </LeftRightLayout>
    </div>
  </TopBottomLayout>
</FullScreenLayout>

<style>
.main {
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
