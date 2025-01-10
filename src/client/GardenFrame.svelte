<script>
  import { run } from 'svelte/legacy'

  import DefaultRendererBuilder from '../renderer/HtmlRenderer.js'
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
  let currentRendererBuilder
  let currentRenderer
  let componentName
  let component = $state()
  let redirectData = {}
  let componentChanged
  let selectedExampleChanged

  let afterFns = []
  let afterAllFns = []
  let beforeFns = []
  let beforeAllFns = []
  let afterRenderedFns = []

  window.addEventListener('message', (evt) => {
    if (config.themeHandler) {
      config.themeHandler(evt.data.theme)
    }

    full = evt.data.stageSize === 'full'
    das = dasMap[evt.data.componentName]
    selectedExample =
      das?.examples?.find((ex) => ex.title === evt.data.selectedExample) ?? {}
    componentChanged = componentName !== evt.data.componentName
    componentName = evt.data.componentName || 'Welcome'
    selectedExampleChanged = selectedExampleTitle !== evt.data.selectedExample
    selectedExampleTitle = evt.data.selectedExample

    component = componentMap?.[componentName]

    if (config.devmodus) {
      redirectData = {}
      return
    } else {
      updateComponent(component, selectedExample, das)
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

  async function updateComponent(component, selectedExample, das) {
    if (config.renderer) {
      const newRendererBuilder = await getRendererBuilderFor(das?.file)
      if (newRendererBuilder !== currentRendererBuilder) {
        await updateRenderer(newRendererBuilder)
      }
    }

    await runHooks()

    try {
      currentRenderer?.updateComponent({
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
  }

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

  run(() => {
    if (!config.devmodus) {
      updateRenderer(DefaultRendererBuilder)
    }
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

<div class:full id="garden_app">
  {#if config.devmodus && component && (das?.file ?? '').indexOf('.svelte') > 0}
    {@const SvelteComponent = component}
    <SvelteComponent {...selectedExample?.input} on:out={handleComponentOut} />
  {/if}
</div>

<style>
  .full {
    padding: 0.5rem 0.5rem 0;
  }
</style>
