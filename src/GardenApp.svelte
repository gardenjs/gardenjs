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
export let config

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
let rootNodesExpanded = true
let themes = []
let activeTheme
let filterNavtree

let stageRect = {
  stageWidth: 900,
  stageHeight: 1000
}

$: {
  themes = config.themes?.map((theme, index) => ({...theme, active: index === 0})) || []
}

$: {
  activeTheme = themes.find(t => t.active)
}

$: projectTitle = config.project_title || ''

$: {
  examples = das.examples || []
  selectedStory = examples[0]?.story 
  if (historystate && historystate.selectedstory) {
    selectedStory = examples.find(ex => ex.story == historystate.selectedstory)?.story
  }
}

let unfoldedNodes
let initialized = false
$: {
  if (!initialized && navtree) {
    const all = navtree.flatMap(getAllNodes)
    unfoldedNodes = all.reduce((acc, cur) => {
      acc[cur.key] = true
      return acc
    }, {})
    initialized = true
  }
}

function getAllNodes(node) {
  return [node, ...getAllChildNodes(node)]
}

function getAllChildNodes(node) {
  return node.children ? node.children.flatMap(getAllNodes) : []
}


let nodes = []
$: {
  nodes = transformNavTree(currentRoute, componentname, unfoldedNodes, navtree, filterNavtree)
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
  if (evt.detail.toggleFolderFoldStatus) {
    if (!rootNodesExpanded) {
      expandRootNode(evt.detail.toggleFolderFoldStatus)
      return
    }
    const node = evt.detail.toggleFolderFoldStatus
    if (unfoldedNodes[node.key] && !(currentRoute.indexOf(node.key) === 0)) {
      unfoldedNodes[node.key] = false
    } else {
      unfoldedNodes[node.key] = true
    }
    unfoldedNodes = unfoldedNodes
  }
  if (evt.detail.toggleRootFolders) {
    rootNodesExpanded = !rootNodesExpanded
    nodes = nodes.map(n => ({...n, unfolded: rootNodesExpanded && unfoldedNodes[n.key]}))
  }
  if (evt.detail.filter) {
    filterNavtree = evt.detail.filter.value?.toLowerCase() || undefined
  }
}

function expandRootNode(node) {
  rootNodesExpanded = true
  Object.keys(unfoldedNodes).forEach(key => unfoldedNodes[key] = false)
  nodes = nodes.map(n => {
    if (n.key === node.key || currentRoute.indexOf(n.key) === 0) {
      unfoldedNodes[n.key] = true
      return {...n, unfolded: true}
    }
    else {
      unfoldedNodes[n.key] = false
      return {...n, unfolded: false}
    }
  })
}

function transformNavTree(route, selectedNode, unfoldedNodes, nodes, filterNavtree, parentVisible) {
  return nodes.map(child => {
    const filterMatches = filterNavtree ? child.name?.toLowerCase().includes(filterNavtree) : true
    const name = filterNavtree && filterMatches ? highlightFilterMatch(child.name, filterNavtree) : child.name
    if (child.isLeaf) {
      const visible = parentVisible || filterMatches
      return visible ? {...child, name, selected: selectedNode === child.key, isLeaf: true } : undefined
    } else {
      const children = transformNavTree(currentRoute, selectedNode, unfoldedNodes, child.children, filterNavtree, parentVisible || filterMatches).filter(n => n)
      const visible = filterMatches || children.length > 0
      return visible ? {...child, name, children, unfolded: isUnfolded(child, route, filterNavtree, visible), filterMatches} : undefined
    }
  }).filter(n => n)
}

function highlightFilterMatch(text, filter) {
  const matchStart = text.toLowerCase().indexOf(filter)
  const matchEnd = matchStart + filter.length
  const start = text.substring(0, matchStart)
  const middle = text.substring(matchStart, matchEnd)
  const end = text.substring(matchEnd)
  return `${start}<span class="highlight">${middle}</span>${end}`
}

function isUnfolded(node, route, filter, visible) {
  return (filter && visible) || unfoldedNodes[node.key] || route.indexOf(node.key) === 0
}

</script>

<FullScreenLayout>
  <TopBottomLayout>
    <div slot="bottom" class="is-full is-flexgrow">
      <LeftRightLayout>
        <div slot="left" class="is-flexfix">
          <Sidebar projectTitle={projectTitle} show={showSidebar} rootNodesExpanded={rootNodesExpanded} nodes={nodes} filter={filterNavtree} on:out={handleSidebarOut} />
        </div>
        <div slot="right" class="main">
          <Topbar active={showSidebar} themes="{themes}" stageRect={stageRect} stageSize={stageSize} landscape={landscape} on:out={handleTopbarOut} />
          <Stage componentname={componentname} das={das} examples={examples} selectedStory={selectedStory} historystate={historystate} 
                 stageSize={stageSize} landscape={landscape} theme={activeTheme} on:out={handleStageOut} />
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
