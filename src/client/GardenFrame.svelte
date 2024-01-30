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
  let fwk
  let currentRenderer
  let componentName
  let component
  let redirectData = {}
  let componentChanged
  let selectedExampleChanged
  let error

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
      (ex) => ex.story === evt.data.selectedExample
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

  async function updateComponent(component, selectedExample, das) {
    if (config.renderer) {
      let newFwk =
        das?.file.substring(das?.file.lastIndexOf('.') + 1) || 'default'
      if (fwk != newFwk) {
        const rendererBuilder =
          config.renderer[newFwk] || DefaultRendererBuilder
        await updateRenderer(rendererBuilder)
        fwk = newFwk
      }
    }

    await runHooks()

    try {
      currentRenderer?.updateComponent({
        component,
        selectedExample,
        das,
      })
    } catch (err) {
      error = err
    }
  }

  async function afterRenderHook() {
    await runHooksIfSet(afterRenderedFns)
  }

  function hideError() {
    error = null
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
          console.log(err)
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

<div class:full>
  {#if config.devmodus}
    <svelte:component
      this={component}
      {...selectedExample?.input}
      {...redirectData}
      {afterRenderHook}
      on:out={handleComponentOut}
    />
  {:else}
    <div id="app"></div>
  {/if}
</div>
{#if error}
  <div class="modal_back" on:click={hideError}>
    <div class="modal">
      <h1>Error during rendering:</h1>
      <div><pre>{error}</pre></div>
    </div>
  </div>
{/if}

<style>
  .full {
    padding: 0.5rem 0.5rem 0;
  }
  .modal_back {
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: 0.3;
  }
  .modal {
    z-index: 1001;
    background-color: white;
    border: 1px solid red;
    flex-direction: column;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
