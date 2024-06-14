<script>
  import Stage from './components/stage/Stage.svelte'
  import Sidebar from './components/sidebar/Sidebar.svelte'
  import Topbar from './components/topbar/Topbar.svelte'
  import {
    updateStage,
    stageStyle,
    stageSize,
    stageHeight,
    stageMaxHeight,
    panelExpanded,
    landscape,
    setThemes,
    selectTheme,
    themes,
    activeTheme,
    toggleExpandPanel,
    updateStageHeight,
    updateStageMaxHeight,
  } from './logic/stage.js'
  import {
    nodes,
    rootNodesExpanded,
    toggleFolder,
    toggleRootFolders,
    filterNavTree,
    updateFilter,
    updateNavTree,
    updateSelectedComponent,
  } from './logic/navTree.js'
  import {
    initRouting,
    das,
    componentName,
    selectedExample,
    updateDasMap,
    currentRoute,
  } from './logic/routing.js'

  let baseurl = '/garden'
  export let routes
  export let navTree
  export let dasMap
  export let config

  $: updateNavTree(navTree)
  $: {
    if (routes && dasMap) initRouting(dasMap, routes, baseurl)
  }
  $: updateDasMap(dasMap)
  $: setThemes(config.themes)
  $: updateSelectedComponent($currentRoute, $componentName)

  $: projectTitle = config.project_title || ''
  let stageRect = {}

  let showSidebar = true
  function handleTopbarOut(evt) {
    if (evt.detail.openInTab) {
      const targetWindow = window.open('/frame.html', '_blank')
      targetWindow.onload = () => {
        targetWindow.postMessage(
          {
            selectedExample: $selectedExample,
            componentName: $componentName,
            theme: $activeTheme.name,
          },
          window.location.origin
        )
      }
    } else if (evt.detail.selectTheme) {
      selectTheme(evt.detail.selectTheme)
    } else {
      showSidebar = evt.detail.active
      updateStage({
        stageSize: evt.detail.stageSize,
        landscape: evt.detail.landscape,
      })
    }
  }

  function handleStageOut(evt) {
    if (evt.detail.stageRect) {
      stageRect = evt.detail.stageRect
    }
    if (evt.detail.stageHeight) {
      updateStageHeight(evt.detail.stageHeight)
    }
    if (evt.detail.toggleExpandPanel) {
      toggleExpandPanel()
    }
    if (evt.detail.stageMaxHeight) {
      updateStageMaxHeight(evt.detail.stageMaxHeight)
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
    if (evt.detail.toggleExpandPanel) {
      toggleExpandPanel()
    }
  }
</script>

{#if window.top !== window.self}
  <h1>Relative Link was clicked</h1>
  <div>To go back click on button</div>
  <button
    on:click={() => {
      window.top.location.reload()
    }}>back</button
  >
{:else}
  <div class="garden">
    <div class="sidebar">
      <Sidebar
        {projectTitle}
        show={showSidebar}
        rootNodesExpanded={$rootNodesExpanded}
        nodes={$nodes}
        filter={$filterNavTree}
        panelExpanded={$panelExpanded}
        on:out={handleSidebarOut}
      />
    </div>
    <div class="main">
      <Topbar
        active={showSidebar}
        themes={$themes}
        {stageRect}
        stageSize={$stageSize}
        landscape={$landscape}
        on:out={handleTopbarOut}
      />
      <Stage
        componentName={$componentName}
        das={$das}
        selectedExample={$selectedExample}
        stageStyle={$stageStyle}
        stageSize={$stageSize}
        stageHeight={$stageHeight}
        stageMaxHeight={$stageMaxHeight}
        theme={$activeTheme?.name}
        panelExpanded={$panelExpanded}
        devmodus={config.devmodus}
        on:out={handleStageOut}
      />
    </div>
  </div>
{/if}

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
    background-color: var(--c-bg-body);
  }
  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
  }
</style>
