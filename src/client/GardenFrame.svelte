<script>
  import { onMount, tick } from 'svelte'

  import DefaultRendererBuilder from '../renderer/HtmlRenderer.js'
  import Inspector from '../client/components/stage/Inspector.svelte'
  import BackgroundGrid from '../client/components/stage/BackgroundGrid.svelte'
  import DistanceMeasure from '../client/components/stage/DistanceMeasure.svelte'
  import {
    A11Y_CLEAR_HIGHLIGHT,
    A11Y_HIGHLIGHT,
    A11Y_SCAN,
  } from './a11y/messages.js'
  import {
    clearA11yHighlights,
    highlightA11yTargets,
  } from './a11y/a11yHighlight.js'
  import {
    runA11yScanAndReport,
    scheduleA11yScan,
  } from './a11y/runA11yInFrame.js'
  /**
   * @typedef {Object} Props
   * @property {any} [componentMap]
   * @property {any} [dasMap]
   * @property {any} config
   */

  /** @type {Props} */
  let { componentMap = {}, dasMap = {}, config } = $props()

  let hookTimeout = config.hookTimeout | 5000
  let das = $state({})
  let selectedExample = $state({})
  let selectedExampleTitle
  let full = $state(false)
  let appTheme = $state()
  let activeTheme = $state()
  let currentRendererBuilder
  let currentRenderer
  let componentName
  let component = $state()
  let redirectData = {}
  let componentChanged
  let selectedExampleChanged
  let showInspector = $state(false)
  let showDistanceMeasure = $state(false)
  let showGrid = $state(false)

  let afterFns = []
  let afterAllFns = []
  let beforeFns = []
  let beforeAllFns = []
  let afterRenderedFns = []

  let contentPane = $state()
  let mounted = $state(false)
  let lastA11yScanKey = ''

  function scheduleA11yScanIfNeeded() {
    if (!config.devmodus) return
    const root = contentPane ?? document.getElementById('garden_app')
    if (!root) return
    const scanKey = `${componentName}:${selectedExampleTitle}:${JSON.stringify(selectedExample?.input ?? {})}`
    if (scanKey === lastA11yScanKey) return
    lastA11yScanKey = scanKey
    tick().then(() => scheduleA11yScan(root, config?.a11y))
  }

  onMount(() => {
    mounted = true
  })

  window.addEventListener('message', (evt) => {
    if (evt.data?.type === A11Y_SCAN) {
      const root = contentPane ?? document.getElementById('garden_app')
      runA11yScanAndReport(root, config?.a11y)
      return
    }

    if (evt.data?.type === A11Y_CLEAR_HIGHLIGHT) {
      clearA11yHighlights()
      return
    }

    if (evt.data?.type === A11Y_HIGHLIGHT) {
      const root = contentPane ?? document.getElementById('garden_app')
      highlightA11yTargets(evt.data.section, root, evt.data.targets).catch(
        (err) => {
          console.error('A11y highlight failed:', err)
        }
      )
      return
    }

    if (config.themeHandler) {
      config.themeHandler(evt.data.activeTheme?.name)
    }

    full = evt.data.stageSize === 'full'
    showInspector = evt.data.showInspector === true
    showDistanceMeasure = evt.data.showDistanceMeasure === true
    showGrid = evt.data.showGrid === true
    activeTheme = evt.data.activeTheme
    das = dasMap[evt.data.componentName]
    const rawSelectedExample =
      das?.examples?.find((ex) => ex.title === evt.data.selectedExample) ?? {}
    const paramValues = evt.data?.paramValues ?? undefined
    selectedExample = {
      ...rawSelectedExample,
      input: paramValues ?? rawSelectedExample?.input ?? {},
    }
    componentChanged = componentName !== evt.data.componentName
    if (componentChanged) {
      clearA11yHighlights()
    }
    componentName = evt.data.componentName || 'Welcome'
    selectedExampleChanged = selectedExampleTitle !== evt.data.selectedExample
    if (selectedExampleChanged) {
      clearA11yHighlights()
    }
    selectedExampleTitle = evt.data.selectedExample
    appTheme = evt.data.appTheme

    component = componentMap?.[componentName]

    if (config.devmodus) {
      redirectData = {}
      scheduleA11yScanIfNeeded()
      return
    } else {
      executeLatest(() => updateComponent(component, selectedExample, das))
    }
  })

  async function getRendererBuilderFor(filename) {
    if (!filename) return DefaultRendererBuilder

    for (const extensionPattern in config.renderer) {
      const regex = new RegExp(extensionPattern + '$')
      if (regex.test(filename)) {
        return config.renderer[extensionPattern]
      }
    }
    return DefaultRendererBuilder
  }

  let latestTask
  let running = false

  const executeLatest = async (task) => {
    latestTask = task
    if (running) return
    if (!running) {
      running = true
      while (latestTask != null) {
        const currentTask = latestTask
        latestTask = undefined
        await currentTask()
      }
      running = false
    }
  }

  async function updateComponent(component, selectedExample, das) {
    if (config.renderer) {
      const newRendererBuilder = await getRendererBuilderFor(das?.file)
      if (newRendererBuilder !== currentRendererBuilder) {
        await updateRenderer(newRendererBuilder)
      }
    }

    await runHooks()

    try {
      await currentRenderer?.updateComponent({
        component,
        selectedExample,
        das,
        decorators: das?.decorators,
        afterRenderHook,
      })
    } catch (e) {
      console.error(e)
    }
  }

  async function afterRenderHook() {
    await runHooksIfSet(afterRenderedFns)
    scheduleA11yScan(contentPane, config?.a11y)
  }

  $effect(() => {
    if (!config.devmodus || !mounted || !contentPane) return
    scheduleA11yScanIfNeeded()
  })

  let currentHooks = []

  async function runHooks() {
    if (componentChanged) {
      afterRenderedFns = [selectedExample?.play]
      beforeAllFns = das?.beforeAll ? [das?.beforeAll] : []

      const oldHooks = das?.hooks
        ? currentHooks.filter((currentHook) => {
            return !das?.hooks.find((newHook) => newHook === currentHook)
          })
        : currentHooks

      const newHooks =
        currentHooks.length > 0
          ? das?.hooks.filter((newHook) => {
              return !currentHooks.find(
                (currentHook) => newHook === currentHook
              )
            })
          : (das?.hooks ?? [])

      currentHooks = das?.hooks ?? []

      const hookBefore =
        currentHooks.filter((h) => h.before).map((hook) => hook.before) ?? []

      afterAllFns = [
        ...afterAllFns,
        ...oldHooks.filter((h) => h.afterAll).map((h) => h.afterAll),
      ]
      beforeAllFns = [
        ...newHooks.filter((h) => h.beforeAll).map((h) => h.beforeAll),
        ...beforeAllFns,
      ]
      beforeFns = [...hookBefore, das?.before, selectedExample?.before].filter(
        (b) => !!b
      )

      await runHooksIfSet([
        ...afterFns,
        ...afterAllFns,
        ...beforeAllFns,
        ...beforeFns,
      ])

      const hookAfter =
        currentHooks.filter((h) => h.after).map((h) => h.after) ?? []

      afterAllFns = das?.afterAll ? [das?.afterAll] : []
      afterFns = [selectedExample?.after, das?.after, ...hookAfter].filter(
        (af) => !!af
      )
      beforeAllFns = []
    } else if (selectedExampleChanged) {
      afterRenderedFns = [selectedExample?.play]
      beforeFns = [das?.before, selectedExample?.before]
      await runHooksIfSet([...afterFns, ...beforeFns])
      afterFns = [selectedExample?.after, das?.after]
    }
  }

  async function updateRenderer(rendererBuilder) {
    try {
      await currentRenderer?.destroy()
    } catch (e) {
      console.error('Could not destroy current renderer', e)
    }
    currentRenderer = await rendererBuilder.create()
  }

  $effect(() => {
    if (!config.devmodus) {
      updateRenderer(DefaultRendererBuilder)
    }
  })

  $effect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      appTheme === 'dark' ? 'dark' : 'light'
    )
  })

  function handleComponentOut(evt) {
    if (das.out) {
      das.out.forEach((out) => {
        if (evt.detail[out.name]) {
          console.log(evt.detail[out.name])
          if (selectedExample.redirect && selectedExample.redirect[out.name]) {
            const input = selectedExample.redirect[out.name]
            redirectData[input] = evt.detail[out.name]
          }
        }
      })
    }
  }

  async function runHooksIfSet(funcs) {
    for (const func of funcs) {
      if (func) {
        try {
          await Promise.race([wait(hookTimeout), func()])
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  function wait(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout on')), ms)
    })
  }
</script>

{#if mounted && showInspector && contentPane}
  <Inspector {contentPane} {appTheme} />
{/if}
{#if mounted && showGrid}
  <BackgroundGrid
    {contentPane}
    gridSettings={activeTheme.grid}
    appMargin={full ? '0.5rem 0.5rem 0' : 0}
  />
{/if}
{#if mounted && showDistanceMeasure}
  <DistanceMeasure {activeTheme} />
{/if}

<div class:full id="garden_app" bind:this={contentPane}>
  {#if config.devmodus && component && (das?.file ?? '').indexOf('.svelte') > 0}
    <svelte:component
      this={component}
      {...selectedExample?.input}
      {...redirectData}
      on:out={handleComponentOut}
    />
  {/if}
</div>

<style>
  .full {
    padding: 0.5rem 0.5rem 0;
  }
</style>
