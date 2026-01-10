<script>
  import { onMount, onDestroy } from 'svelte'
  import HorizontalSplitPane from '../panes/HorizontalSplitPane.svelte'
  import ResizePane from '../panes/ResizePane.svelte'
  import PanelComponent from './panel/PanelComponent.svelte'
  import PanelExamplesNav from './panel/PanelExamplesNav.svelte'
  import PanelDescription from './panel/PanelDescription.svelte'
  import PanelCode from './panel/PanelCode.svelte'

  let {
    appTheme,
    componentName,
    das = {},
    devmodus,
    gridSettings,
    panelExpanded,
    selectedExample,
    showGrid,
    showInspector,
    stageContainerHeight,
    stageContainerMaxHeight,
    stageHeight,
    stageMaxHeight,
    stageMaxWidth,
    stageSize,
    stageStyle,
    stageWidth,
    theme,
    onSetStageContainerHeight,
    onSetStageContainerMaxHeight,
    onSetStageContainerWidth,
    onSetStageHeight,
    onSetStageWidth,
    onToggleExpandPanel,
    onUpdateStageRect,
  } = $props()

  let myframeready = $state()
  let myframe = $state()

  const params = $derived.by(() => {
    if (das?.params && Array.isArray(das.params)) return das.params
    return []
  })

  const selectedExampleObj = $derived.by(() => {
    if (!das?.examples?.length) return {}
    return das.examples.find((ex) => ex.title === selectedExample) ?? {}
  })

  const selectedExampleInput = $derived.by(() => {
    const input = selectedExampleObj?.input
    if (input && typeof input === 'object') return input
    return {}
  })

  const computeInitialParamValues = (params, input) => {
    const next = {}
    for (const p of params ?? []) {
      if (!p?.name) continue
      if (Object.prototype.hasOwnProperty.call(input, p.name)) {
        next[p.name] = input[p.name]
      }
    }
    return next
  }

  let paramValues = $derived(
    computeInitialParamValues(params, selectedExampleInput)
  )

  const mergedArgs = $derived.by(() => {
    return { ...paramValues }
  })

  const argsForMessage = $derived.by(() => {
    try {
      return JSON.parse(JSON.stringify(mergedArgs))
    } catch {
      return {}
    }
  })

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      onUpdateStageRect(entry.contentRect)
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
          params,
          values: paramValues,
          onChange: (prop, value) => {
            paramValues = { ...paramValues, [prop]: value }
          },
          onReset: () => {
            paramValues = computeInitialParamValues(
              params,
              selectedExampleInput
            )
          },
          selected: selectedExample,
          examples: das.examples.map((ex) => ex.title),
          onSelectExample: setSelectedExample,
        },
        page: PanelExamplesNav,
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

  function setSelectedExample(selectedExample) {
    globalThis.history.pushState(
      { selectedExample },
      '',
      window.location.pathname.substring('/garden'.length)
    )
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
          args: argsForMessage,
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
  onSetTopHeight={onSetStageContainerHeight}
  onSetMaxHeight={onSetStageContainerMaxHeight}
  onSetMaxWidth={onSetStageContainerWidth}
>
  {#snippet top()}
    <ResizePane
      disabled={stageSize !== 'full'}
      maxHeight={stageMaxHeight}
      maxWidth={stageMaxWidth}
      paneHeight={stageHeight}
      paneWidth={stageWidth}
      {onSetStageHeight}
      {onSetStageWidth}
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
        <PanelComponent {tabs} {onToggleExpandPanel} children={undefined} />
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
