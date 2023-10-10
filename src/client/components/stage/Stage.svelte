<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import HorizontalSplitPane from '../splitpanes/HorizontalSplitPane.svelte'
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
  export let expressbaseurl
  export let stageHeight
  export let stageMaxHeight
  export let panelExpanded

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
      myframe.contentWindow.addEventListener('mouseup', function (event) {
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
      myframe.contentWindow.postMessage(
        { selectedExample, componentName, stageSize },
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
          items: das.examples.map((ex) => ex.story),
        },
        page: PanelStoriesNav,
        out: handleSelectionChange,
      })
    }
    if (das.componentfile) {
      tabs.push({
        name: 'Code',
        props: { componentName, expressbaseurl },
        page: PanelCode,
      })
    }
    return tabs
  }

  function handleSelectionChange(evt) {
    globalThis.history.pushState(
      { selectedstory: evt.detail.selecteditem },
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
      dispatch('out', { stageHeight: evt.detail.topHeight })
    }
    if (evt.detail.maxHeight) {
      dispatch('out', { stageMaxHeight: evt.detail.maxHeight })
    }
  }
</script>

<HorizontalSplitPane
  topHeight={stageHeight}
  maxHeight={stageMaxHeight}
  on:out={handleHorizontalSplitPaneOut}
>
  <div slot="top" class="stage_container">
    <iframe
      class="stage_iframe"
      title="preview"
      bind:this={myframe}
      src="/gardenframe/"
      style={stageStyle}
    ></iframe>
  </div>
  <div slot="bottom" class="panel">
    {#if panelExpanded}
      <PanelComponent {tabs} on:out />
    {/if}
  </div>
</HorizontalSplitPane>

<style>
  .stage_container {
    height: 100%;
    width: auto;
    overflow-y: auto;
  }
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
    border: 1px solid var(--c-basic-300);
    border-top: 0;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    overflow-y: auto;
  }
</style>
