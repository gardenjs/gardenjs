<script>
  import Stage from './components/stage/Stage.svelte'
  import Sidebar from './components/sidebar/Sidebar.svelte'
  import Topbar from './components/topbar/Topbar.svelte'
  import {
    stageStyle,
    stageSize,
    stageContainerHeight,
    stageContainerMaxHeight,
    stageHeight,
    stageWidth,
    stageMaxHeight,
    stageMaxWidth,
    stageRect,
    panelExpanded,
    landscape,
    setThemes,
    setTheme,
    themes,
    stageSizes,
    setStageSizes,
    appTheme,
    toggleAppTheme,
    activeTheme,
    toggleExpandPanel,
    setStagesize,
    updateStageContainerHeight,
    updateStageContainerWidth,
    updateStageContainerMaxHeight,
    updateStageHeight,
    updateStageWidth,
    updateStageRect,
    sidebarExpanded,
    toggleExpandSidebar,
    toggleShowInspector,
    toggleShowGrid,
    toggleOrientation,
    handleSelectionChanged,
    showInspector,
    showGrid,
    gridSettings,
    setGridSettings,
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
    toggleBookmark,
    selectedNode,
    bookmarks,
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

  let { routes, navTree, dasMap, config } = $props()

  $effect(() => {
    updateNavTree(navTree)
  })
  $effect(() => {
    if (routes && dasMap) initRouting(dasMap, routes, baseurl)
  })
  $effect(() => {
    updateDasMap(dasMap)
  })
  $effect(() => {
    setThemes(config.themes)
  })
  $effect(() => {
    if (config.devices) {
      setStageSizes(config.devices)
    }
    if (config.grid) {
      setGridSettings(config.grid)
    }
  })
  $effect(() => {
    updateSelectedComponent($currentRoute, $componentName)
    handleSelectionChanged()
  })

  let projectTitle = config.project_title || ''
  let projectLogo = config.project_logo?.split('/').pop() || null
  let projectLogoDarkmode =
    config.project_logo_darkmode?.split('/').pop() || null

  let docsLink = $derived(config.docs_link ? 1 : 0)

  function openInTab() {
    const targetWindow = window.open('/frame.html', '_blank')
    targetWindow.onload = () => {
      targetWindow.postMessage(
        {
          selectedExample: $selectedExample,
          componentName: $componentName,
          theme: $activeTheme,
        },
        window.location.origin
      )
    }
  }
</script>

{#if window.top !== window.self}
  <div class="message">
    <div class="click-completed">Relative link was clicked!</div>
    <div class="instruction">
      Click the button to return:
      <button
        onclick={() => {
          window.top.location.reload()
        }}>back</button
      >
    </div>
  </div>
{:else}
  <div class="garden">
    <div class="sidebar">
      <Sidebar
        {docsLink}
        {projectLogoDarkmode}
        {projectLogo}
        {projectTitle}
        appTheme={$appTheme}
        bookmarks={$bookmarks}
        filter={$filterNavTree}
        nodes={$nodes}
        panelExpanded={$panelExpanded}
        rootNodesExpanded={$rootNodesExpanded}
        sidebarExpanded={$sidebarExpanded}
        onToggleBookmark={toggleBookmark}
        onToggleExpandPanel={toggleExpandPanel}
        onToggleFoldStatusOfNode={toggleFolder}
        onToggleRootFolders={toggleRootFolders}
        onUpdateFilter={updateFilter}
      />
    </div>
    <div class="main">
      <Topbar
        appTheme={$appTheme}
        landscape={$landscape}
        node={$selectedNode}
        showGrid={$showGrid}
        showInspector={$showInspector}
        sidebarExpanded={$sidebarExpanded}
        stageHeight={$stageHeight}
        stageMaxHeight={$stageMaxHeight}
        stageMaxWidth={$stageMaxWidth}
        stageRect={$stageRect}
        stageSize={$stageSize}
        stageSizes={$stageSizes}
        stageWidth={$stageWidth}
        themes={$themes}
        onOpenInTab={openInTab}
        onSetStageHeight={updateStageHeight}
        onSetStageWidth={updateStageWidth}
        onSetStageSize={setStagesize}
        onSetTheme={setTheme}
        onToggleAppTheme={toggleAppTheme}
        onToggleBookmark={toggleBookmark}
        onToggleExpandSidebar={toggleExpandSidebar}
        onToggleOrientation={toggleOrientation}
        onToggleShowGrid={toggleShowGrid}
        onToggleShowInspector={toggleShowInspector}
      />
      <Stage
        appTheme={$appTheme}
        componentName={$componentName}
        das={$das}
        devmodus={config.devmodus}
        gridSettings={$gridSettings}
        panelExpanded={$panelExpanded}
        selectedExample={$selectedExample}
        showGrid={$showGrid}
        showInspector={$showInspector}
        stageContainerHeight={$stageContainerHeight}
        stageContainerMaxHeight={$stageContainerMaxHeight}
        stageHeight={$stageHeight}
        stageMaxHeight={$stageMaxHeight}
        stageMaxWidth={$stageMaxWidth}
        stageSize={$stageSize}
        stageStyle={$stageStyle}
        stageWidth={$stageWidth}
        theme={$activeTheme}
        onSetStageContainerHeight={updateStageContainerHeight}
        onSetStageContainerMaxHeight={updateStageContainerMaxHeight}
        onSetStageContainerWidth={updateStageContainerWidth}
        onSetStageHeight={updateStageHeight}
        onSetStageWidth={updateStageWidth}
        onToggleExpandPanel={toggleExpandPanel}
        onUpdateStageRect={updateStageRect}
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
  .message {
    display: inline-block;
    margin: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.625rem;
  }
  .click-completed {
    margin: 0 0 0.75rem;
    font-size: 120%;
    font-weight: 500;
  }
  .instruction button {
    padding: 0.125rem 0.75rem;
    background: var(--c-basic-150);
    border-radius: 0.375rem;
    font-size: 90%;
    color: var(--c-basic-900);
    font-weight: 600;
    text-transform: uppercase;
  }
</style>
