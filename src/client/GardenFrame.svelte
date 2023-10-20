<script>
  import SvelteRenderer from '../renderer/SvelteRenderer.svelte'
  import DefaultRendererBuilder from '../renderer/SvelteRenderer.js'
  export let componentMap = {}
  export let dasMap = {}
  export let config

  let das = {}
  let selectedExample = {}
  let full = false
  let fwk
  let currentRenderer
  let componentName
  let component
  let redirectData = {}

  window.addEventListener('message', (evt) => {
    if (config.themeHandler) {
      config.themeHandler(evt.data.theme)
    }
    full = evt.data.stageSize === 'full'
    das = dasMap[evt.data.componentName]
    selectedExample = das?.examples.find(
      (ex) => ex.story === evt.data.selectedExample
    )
    componentName = evt.data.componentName
    if (config.devmodus) {
      component = componentMap?.[componentName] || componentMap?.Welcome
      redirectData = {}
    } else {
      updateComponent(componentName, selectedExample, das)
    }
  })

  async function updateComponent(componentName, selectedExample, das) {
    if (config.renderer) {
      let newFwk =
        das?.file.substring(das?.file.lastIndexOf('.') + 1) || 'svelte'
      if (fwk != newFwk) {
        const rendererBuilder = config.renderer[newFwk]
        await updateRenderer(rendererBuilder)
        fwk = newFwk
      }
    }
    currentRenderer?.updateComponent({
      componentName,
      selectedExample,
      das,
      componentMap,
    })
  }

  async function updateRenderer(rendererBuilder) {
    await currentRenderer?.destroy()
    currentRenderer = await rendererBuilder.create()
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
</script>

<div class:full>
  {#if config.devmodus}
    <svelte:component
      this={component}
      {...selectedExample?.input}
      {...redirectData}
      on:out={handleComponentOut}
    />
  {:else}
    <div id="app"></div>
  {/if}
</div>

<style>
  .full {
    padding: 0.5rem 0.5rem 0;
  }
</style>
