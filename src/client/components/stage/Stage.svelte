<script>
  import { onMount, onDestroy, tick } from 'svelte'
  import HorizontalSplitPane from '../panes/HorizontalSplitPane.svelte'
  import ResizePane from '../panes/ResizePane.svelte'
  import PanelComponent from './panel/PanelComponent.svelte'
  import PanelExamplesNav from './panel/PanelExamplesNav.svelte'
  import PanelDescription from './panel/PanelDescription.svelte'
  import PanelCode from './panel/PanelCode.svelte'
  import PanelA11y from './panel/PanelA11y.svelte'
  import {
    a11yClearHighlightMessage,
    a11yConfigAction,
    a11yHighlightMessage,
    a11yInactiveMessage,
    a11yScanMessage,
    a11yStateFromFrameMessage,
    emptyA11yState,
  } from '../../a11y/stageA11y.js'

  let {
    appTheme,
    componentName,
    das = {},
    devmodus,
    panelExpanded,
    selectedExample,
    showGrid,
    showInspector,
    showDistanceMeasure,
    stageContainerHeight,
    stageContainerMaxHeight,
    stageHeight,
    stageMaxHeight,
    stageMaxWidth,
    stageSize,
    stageStyle,
    stageWidth,
    activeTheme,
    a11yEnabled = true,
    a11y = undefined,
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
  let a11yPaneActive = $state(false)
  let a11yUiEnabled = $state(true)
  let a11yState = $state(emptyA11yState())

  const a11yActive = $derived(a11yEnabled && a11yUiEnabled)

  const selectedExampleObj = $derived.by(() => {
    if (!das?.examples?.length) return {}
    return das.examples.find((ex) => ex.title === selectedExample) ?? {}
  })

  const selectedExampleInput = $derived.by(() => {
    const input = selectedExampleObj?.input
    if (input && typeof input === 'object') return input
    return {}
  })

  function getType(value) {
    if (Array.isArray(value)) {
      return 'array'
    }
    if (value instanceof Date) {
      return 'date'
    }
    return typeof value
  }

  function capitalize(str) {
    if (str.length > 1) {
      return str.charAt(0).toUpperCase() + str.substring(1)
    }
    return str
  }

  const params = $derived.by(() => {
    const configuredParams = das?.params ?? []
    const exampleParams = Object.entries(selectedExampleInput).reduce(
      (acc, [name, value]) => {
        let configuredParam = configuredParams.find((p) => p.name === name)
        if (configuredParam) {
          acc.push(configuredParam)
        } else {
          acc.push({ name, type: getType(value), label: capitalize(name) })
        }
        return acc
      },
      []
    )

    return [
      ...exampleParams,
      ...configuredParams
        .filter((configuredParam) =>
          exampleParams.every(
            (exampleParam) => exampleParam.name !== configuredParam.name
          )
        )
        .map((p) => ({ ...p, value: undefined })),
    ]
  })

  let paramValues = $derived(structuredClone(selectedExampleInput))

  const paramValuesForPostMessage = $derived.by(() => {
    try {
      return JSON.parse(JSON.stringify(paramValues))
    } catch (e) {
      console.error(e)
      return null
    }
  })

  const valuesChanged = $derived.by(() => {
    try {
      return (
        JSON.stringify(paramValues) !== JSON.stringify(selectedExampleInput)
      )
    } catch {
      return false
    }
  })

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      onUpdateStageRect(entry.contentRect)
    })
  })

  function postToPreviewFrame(message) {
    const win = myframe?.contentWindow
    if (!win) return
    win.postMessage(message, window.location.origin)
  }

  function sendA11yScan() {
    if (!myframeready || !myframe?.contentWindow) return
    postToPreviewFrame(a11yScanMessage(a11yActive, a11y))
  }

  function onA11yPaneChange(active) {
    a11yPaneActive = active
    if (!active) {
      postToPreviewFrame(a11yClearHighlightMessage())
      a11yState = emptyA11yState()
      postToPreviewFrame(a11yInactiveMessage())
      return
    }
    sendA11yScan()
  }

  function onToggleA11yUi() {
    a11yUiEnabled = !a11yUiEnabled
    if (!a11yUiEnabled) onA11yPaneChange(false)
  }

  function onHighlightA11yRule(section, targets) {
    postToPreviewFrame(a11yHighlightMessage(section, targets))
  }

  function onClearA11yHighlight() {
    postToPreviewFrame(a11yClearHighlightMessage())
  }

  let prevA11yConfig
  $effect(() => {
    const next = { active: a11yActive, a11y }
    const action = a11yConfigAction(prevA11yConfig, next, a11yPaneActive)
    prevA11yConfig = next
    if (action === 'deactivate') {
      a11yState = emptyA11yState()
      postToPreviewFrame(a11yInactiveMessage())
    } else if (action === 'scan') {
      sendA11yScan()
    }
  })

  function onA11yMessage(evt) {
    if (evt.source !== myframe?.contentWindow) return
    const next = a11yStateFromFrameMessage(evt.data, a11yPaneActive)
    if (next) a11yState = next
  }

  function markFrameReady() {
    if (myframe?.contentDocument?.readyState === 'complete') {
      myframeready = true
    }
  }

  function postPreviewState() {
    const win = myframe?.contentWindow
    if (!win) return
    if (
      !myframe.contentDocument ||
      !/frame.html$/.test(myframe.contentWindow.location)
    ) {
      window.location.reload
    }
    win.postMessage(
      {
        selectedExample,
        componentName,
        stageSize,
        activeTheme,
        appTheme,
        showInspector,
        showDistanceMeasure,
        showGrid,
        paramValues: paramValuesForPostMessage,
      },
      window.location.origin
    )
  }

  async function onFrameLoad() {
    myframeready = false
    await tick()
    markFrameReady()
    if (myframeready) {
      postPreviewState()
      if (a11yPaneActive && a11yActive) sendA11yScan()
    }
  }

  $effect(() => {
    if (!myframe) return
    markFrameReady()
    myframe.addEventListener('load', onFrameLoad)
    return () => myframe.removeEventListener('load', onFrameLoad)
  })

  onMount(() => {
    window.addEventListener('message', onA11yMessage)

    if (myframe) {
      resizeObserver.observe(myframe)
      markFrameReady()
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
    window.removeEventListener('message', onA11yMessage)
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
          valuesChanged,
          onChange: (prop, value) => {
            paramValues = { ...paramValues, [prop]: value }
          },
          onReset: () => {
            paramValues = { ...selectedExampleInput }
          },
          selected: selectedExample,
          examples: das.examples.map((ex) => ex.title),
          onSelectExample: setSelectedExample,
          a11yEnabled: a11yActive,
          a11yState,
          onHighlightA11yRule,
          onClearA11yHighlight,
          onA11yPaneChange,
        },
        page: PanelExamplesNav,
      })
    } else if (a11yActive) {
      tabs.push({
        name: 'Accessibility',
        props: {
          a11yState,
          onHighlightA11yRule,
          onClearA11yHighlight,
          onActiveChange: onA11yPaneChange,
        },
        page: PanelA11y,
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
      postPreviewState()
    }
  })

  const tabs = $derived.by(() => createTabs(das))
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
        <PanelComponent
          {tabs}
          {onToggleExpandPanel}
          a11yAvailable={a11yEnabled}
          {a11yUiEnabled}
          {onToggleA11yUi}
          children={undefined}
        />
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
