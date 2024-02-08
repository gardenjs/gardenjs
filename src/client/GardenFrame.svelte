<script>
  import DefaultRendererBuilder from '../renderer/HtmlRenderer.js'
  export let componentMap = {}
  export let dasMap = {}
  export let config

  let hookTimeout = config.hookTimeout | 5000
  let das = {}
  let selectedExample = {}
  let selectedExampleTitle
  let full = false
  let currentRendererBuilder
  //  let currentRenderer
  let componentName
  let component
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
    if (componentName != evt.data.componentName) {
      componentChanged = true
    }
    full = evt.data.stageSize === 'full'
    das = dasMap[evt.data.componentName]
    selectedExample = das?.examples.find(
      (ex) => ex.title === evt.data.selectedExample
    )
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
      })
    } catch (e) {
      console.error(e)
    }
  }

  async function afterRenderHook() {
    await runHooksIfSet(afterRenderedFns)
  }

  async function runHooks() {
    if (componentChanged) {
      afterRenderedFns = [selectedExample?.play]
      beforeAllFns = [das?.beforeAll]
      beforeFns = [das?.before, selectedExample?.before]
      await runHooksIfSet([
        ...afterFns,
        ...afterAllFns,
        ...beforeAllFns,
        ...beforeFns,
      ])
      afterAllFns = [das?.afterAll]
      afterFns = [selectedExample?.after, das?.after]
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
    currentRenderer = await rendererBuilder.create(afterRenderHook)
  }

  $: {
    if (!config.devmodus) {
      updateRenderer(DefaultRendererBuilder)
    }
  }

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
  {#if config.devmodus}
    <svelte:component
      this={component}
      {...selectedExample?.input}
      {...redirectData}
      {afterRenderHook}
      on:out={handleComponentOut}
    />
  {/if}
</div>

<style>
  .full {
    padding: 0.5rem 0.5rem 0;
  }
</style>
