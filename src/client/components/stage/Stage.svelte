<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import HorizontalSplitPane from '../panes/HorizontalSplitPane.svelte'
  import ResizePane from '../panes/ResizePane.svelte'
  import PanelComponent from './panel/PanelComponent.svelte'
  import PanelStoriesNav from './panel/PanelStoriesNav.svelte'
  import PanelDescription from './panel/PanelDescription.svelte'
  import PanelCode from './panel/PanelCode.svelte'

  const dispatch = createEventDispatcher()

  /**
   * @typedef {Object} Props
   * @property {any} componentName
   * @property {any} [das]
   * @property {any} stageStyle
   * @property {any} stageSize
   * @property {any} selectedExample
   * @property {any} stageContainerHeight
   * @property {any} stageContainerMaxHeight
   * @property {any} stageHeight
   * @property {any} stageWidth
   * @property {any} stageMaxHeight
   * @property {any} stageMaxWidth
   * @property {any} panelExpanded
   * @property {any} showInspector
   * @property {any} showGrid
   * @property {any} theme
   * @property {any} devmodus
   */

  /** @type {Props} */
  let {
    componentName,
    das = {},
    stageStyle,
    stageSize,
    selectedExample,
    stageContainerHeight,
    stageContainerMaxHeight,
    stageHeight,
    stageWidth,
    stageMaxHeight,
    stageMaxWidth,
    showInspector,
    showGrid,
    gridSettings,
    panelExpanded,
    theme,
    appTheme,
    devmodus,
  } = $props()

  let myframeready = $state()
  let myframe = $state()

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      updateStageRect(entry.contentRect)
    })
  })

  onMount(() => {
    if (myframe) {
      resizeObserver.observe(myframe)
      myframe.contentWindow.onload = () => {
        myframeready = true
      }
      myframe.contentWindow.addEventListener('mousemove', function (event) {
        var boundingClientRect = myframe.getBoundingClientRect()
        var evt = new CustomEvent('mousemove', {
          bubbles: true,
          cancelable: false,
        })
        // @ts-ignore
        evt.pageX = event.clientX + boundingClientRect.left
        // @ts-ignore
        evt.pageY = event.clientY + boundingClientRect.top
        myframe.dispatchEvent(evt)
      })
      myframe.contentWindow.addEventListener('mouseup', function () {
        var evt = new CustomEvent('mouseup', {
          bubbles: true,
          cancelable: false,
        })
        myframe.dispatchEvent(evt)
      })
    }
  })
  onDestroy(() => {
    resizeObserver.disconnect()
  })

  function createTabs(das) {
    const tabs = []
    if (das.description) {
      tabs.push({ name: 'Notes', props: { das }, page: PanelDescription })
    }
    if (das.examples?.length) {
      tabs.push({
        name: 'Examples',
        props: {
          selected: selectedExample,
          items: das.examples.map((ex) => ex.title),
        },
        page: PanelStoriesNav,
        out: handleSelectionChange,
      })
    }
    if (!devmodus && das.componentfile) {
      tabs.push({
        name: 'Code',
        props: { componentName, devmodus },
        page: PanelCode,
      })
    }
    return tabs
  }

  function handleSelectionChange(evt) {
    globalThis.history.pushState(
      { selectedExample: evt.detail.selecteditem },
      '',
      window.location.pathname.substring('/garden'.length)
    )
  }

  function updateStageRect(stageRect) {
    dispatch('out', {
      stageRect,
    })
  }

  function handleHorizontalSplitPaneOut(evt) {
    if (evt.detail.topHeight) {
      dispatch('out', { stageContainerHeight: evt.detail.topHeight })
    }
    if (evt.detail.maxHeight) {
      dispatch('out', { stageContainerMaxHeight: evt.detail.maxHeight })
    }
    if (evt.detail.maxWidth) {
      dispatch('out', { stageContainerWidth: evt.detail.maxWidth })
    }
  }

  function handleResizePaneOut(evt) {
    if (evt.detail.stageHeight) {
      dispatch('out', { stageHeight: evt.detail.stageHeight })
    }
    if (evt.detail.stageWidth) {
      dispatch('out', { stageWidth: evt.detail.stageWidth })
    }
  }

  $effect(() => {
    if (myframeready) {
      if (
        !myframe.contentDocument ||
        !/frame.html$/.test(myframe.contentWindow.location)
      ) {
        window.location.reload
      }
      myframe.contentWindow.postMessage(
        {
          selectedExample,
          componentName,
          stageSize,
          theme,
          appTheme,
          showInspector,
          showGrid,
          gridSettings,
        },
        window.location
      )
    }
  })

  const tabs = $derived(createTabs(das))
</script>

<HorizontalSplitPane
  topHeight={stageContainerHeight}
  maxHeight={stageContainerMaxHeight}
  on:out={handleHorizontalSplitPaneOut}
>
  {#snippet top()}
    <ResizePane
      disabled={stageSize !== 'full'}
      maxHeight={stageMaxHeight}
      maxWidth={stageMaxWidth}
      paneHeight={stageHeight}
      paneWidth={stageWidth}
      on:out={handleResizePaneOut}
    >
      <iframe
        class="stage_iframe"
        title="preview"
        bind:this={myframe}
        src="/frame.html"
        style={stageStyle}
      ></iframe>
    </ResizePane>
  {/snippet}
  {#snippet bottom()}
    <div class="panel">
      {#if panelExpanded}
        <PanelComponent {tabs} on:out />
      {/if}
    </div>
  {/snippet}
</HorizontalSplitPane>

<style>
  .stage_iframe {
    display: block;
    align-self: center;
    margin: auto;
    height: 100%;
    width: 100%;
    background-color: var(--c-basic-0);
  }
  .panel {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
    margin-bottom: 0.375rem;
    height: 100%;
    width: 100%;
    background-color: var(--c-basic-0);
    border-top: 0;
    border-radius: 0 0 0.625rem 0.625rem;
    overflow-y: auto;
  }
</style>
