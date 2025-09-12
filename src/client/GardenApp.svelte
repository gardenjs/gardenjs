<script>
  import { run } from 'svelte/legacy'

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
    panelExpanded,
    landscape,
    setThemes,
    selectTheme,
    themes,
    stageSizes,
    setStageSizes,
    appTheme,
    updateAppTheme,
    activeTheme,
    toggleExpandPanel,
    setStagesize,
    setLandscape,
    updateStageContainerHeight,
    updateStageContainerWidth,
    updateStageContainerMaxHeight,
    updateStageHeight,
    updateStageWidth,
    sidebarExpanded,
    toggleExpandSidebar,
    handleSelectionChanged,
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
  /**
   * @typedef {Object} Props
   * @property {any} routes
   * @property {any} navTree
   * @property {any} dasMap
   * @property {any} config
   */

  /** @type {Props} */
  let { routes, navTree, dasMap, config } = $props()

  run(() => {
    updateNavTree(navTree)
  })
  run(() => {
    if (routes && dasMap) initRouting(dasMap, routes, baseurl)
  })
  run(() => {
    updateDasMap(dasMap)
  })
  run(() => {
    setThemes(config.themes)
  })
  run(() => {
    if (config.devices) {
      setStageSizes(config.devices)
    }
  })
  run(() => {
    updateSelectedComponent($currentRoute, $componentName)
    handleSelectionChanged()
  })

  let projectTitle = config.project_title || ''
  let projectLogo = config.project_logo?.split('/').pop() || null
  let projectLogoDarkmode =
    config.project_logo_darkmode?.split('/').pop() || null

  let stageRect = $state({})

  let docsLink = $derived(config.docs_link ? 1 : 0)

  function handleTopbarOut(evt) {
    if (evt.detail.openInTab) {
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
    if (evt.detail.selectTheme) {
      selectTheme(evt.detail.selectTheme)
    }
    if (evt.detail.updateAppTheme) {
      updateAppTheme(evt.detail.updateAppTheme)
    }
    if (evt.detail.toggleExpandSidebar) {
      toggleExpandSidebar()
    }
    if (evt.detail.stageWidth) {
      updateStageWidth(evt.detail.stageWidth)
    }
    if (evt.detail.stageHeight) {
      updateStageHeight(evt.detail.stageHeight)
    }
    if (evt.detail.toggleBookmark) {
      toggleBookmark(evt.detail.toggleBookmark)
    }
    if (evt.detail.stageSize) {
      setStagesize(evt.detail.stageSize)
    }
    if (evt.detail.landscape !== undefined) {
      setLandscape(evt.detail.landscape)
    }
  }

  function handleStageOut(evt) {
    if (evt.detail.stageRect) {
      stageRect = evt.detail.stageRect
    }
    if (evt.detail.stageContainerHeight) {
      updateStageContainerHeight(evt.detail.stageContainerHeight)
    }
    if (evt.detail.toggleExpandPanel) {
      toggleExpandPanel()
    }
    if (evt.detail.stageContainerWidth) {
      updateStageContainerWidth(evt.detail.stageContainerWidth)
    }
    if (evt.detail.stageContainerMaxHeight) {
      updateStageContainerMaxHeight(evt.detail.stageContainerMaxHeight)
    }
    if (evt.detail.stageWidth) {
      updateStageWidth(evt.detail.stageWidth)
    }
    if (evt.detail.stageHeight) {
      updateStageHeight(evt.detail.stageHeight)
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
      updateFilter(evt.detail.filter.value)
    }
    if (evt.detail.toggleExpandPanel) {
      toggleExpandPanel()
    }
    if (evt.detail.toggleBookmark) {
      toggleBookmark(evt.detail.toggleBookmark)
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
        {projectTitle}
        {projectLogo}
        {projectLogoDarkmode}
        appTheme={$appTheme}
        sidebarExpanded={$sidebarExpanded}
        rootNodesExpanded={$rootNodesExpanded}
        nodes={$nodes}
        filter={$filterNavTree}
        panelExpanded={$panelExpanded}
        bookmarks={$bookmarks}
        on:out={handleSidebarOut}
        {docsLink}
      />
    </div>
    <div class="main">
      <Topbar
        sidebarExpanded={$sidebarExpanded}
        node={$selectedNode}
        themes={$themes}
        stageSizes={$stageSizes}
        appTheme={$appTheme}
        {stageRect}
        stageSize={$stageSize}
        landscape={$landscape}
        stageWidth={$stageWidth}
        stageHeight={$stageHeight}
        stageMaxHeight={$stageMaxHeight}
        stageMaxWidth={$stageMaxWidth}
        on:out={handleTopbarOut}
      />
      <Stage
        componentName={$componentName}
        das={$das}
        selectedExample={$selectedExample}
        stageStyle={$stageStyle}
        stageSize={$stageSize}
        stageContainerHeight={$stageContainerHeight}
        stageContainerMaxHeight={$stageContainerMaxHeight}
        stageHeight={$stageHeight}
        stageWidth={$stageWidth}
        stageMaxHeight={$stageMaxHeight}
        stageMaxWidth={$stageMaxWidth}
        theme={$activeTheme}
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
