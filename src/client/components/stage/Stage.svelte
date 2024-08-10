<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import HorizontalSplitPane from '../panes/HorizontalSplitPane.svelte'
  import ResizePane from '../panes/ResizePane.svelte'
  import PanelComponent from './panel/PanelComponent.svelte'
  import PanelStoriesNav from './panel/PanelStoriesNav.svelte'
  import PanelDescription from './panel/PanelDescription.svelte'
  import PanelCode from './panel/PanelCode.svelte'

  const dispatch = createEventDispatcher()

  export let componentName
  export let das = {}
  export let stageStyle
  export let stageSize
  export let selectedExample
  export let stageContainerHeight
  export let stageContainerMaxHeight
  export let stageHeight
  export let stageWidth
  export let stageMaxHeight
  export let stageMaxWidth
  export let panelExpanded
  export let theme
  export let devmodus

  let myframeready
  let myframe

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

  $: {
    if (myframeready) {
      if (
        !myframe.contentDocument ||
        !/frame.html$/.test(myframe.contentWindow.location)
      ) {
        window.location.reload
      }
      myframe.contentWindow.postMessage(
        { selectedExample, componentName, stageSize, theme },
        window.location
      )
    }
  }

  $: tabs = createTabs(das)

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
</script>

<HorizontalSplitPane
  topHeight={stageContainerHeight}
  maxHeight={stageContainerMaxHeight}
  on:out={handleHorizontalSplitPaneOut}
>
  <ResizePane
    slot="top"
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
  <div slot="bottom" class="panel">
    {#if panelExpanded}
      <PanelComponent {tabs} on:out />
    {/if}
  </div>
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
    height: 100%;
    width: 100%;
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
