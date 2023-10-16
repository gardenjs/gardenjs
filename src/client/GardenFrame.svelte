<script>
  export let componentMap = {}
  export let dasMap = {}
  export let config
  import SvelteApp from '../renderer/SvelteRenderer.svelte'
  import { createApp } from 'vue'
  import VueApp from '../renderer/VueRenderer.vue'
  import { updateVueState } from '../renderer/state.js'

  let das = {}
  let selectedExample = {}
  let full = false
  let fwk
  let currentRenderer

  window.addEventListener('message', (evt) => {
    if (config.themeHandler) {
      config.themeHandler(evt.data.theme)
    }
    full = evt.data.stageSize === 'full'
    das = dasMap[evt.data.componentName]
    selectedExample = das?.examples.find(
      (ex) => ex.story === evt.data.selectedExample
    )
    updateComponent(evt.data.componentName, selectedExample, das)
  })

  function updateComponent(componentName, selectedExample, das) {
    const newFwk = das?.file.indexOf('vue') > 0 ? 'vue' : 'svelte'
    if (fwk != newFwk) {
      updateRenderer(newFwk)
      fwk = newFwk
    }
    currentRenderer?.updateComponent({ componentName, selectedExample, das })
  }

  async function updateRenderer(newFwk) {
    await currentRenderer?.destroy()
    if (newFwk === 'svelte') {
      currentRenderer = await createSvelteRenderer()
    } else if (newFwk === 'vue') {
      currentRenderer = await createVueRenderer()
    }
  }

  async function createSvelteRenderer() {
    const app = new SvelteApp({
      target: document.getElementById('app'),
    })
    return {
      destroy: () => app.$destroy(),
      updateComponent: (props) => app.$set(props),
    }
  }

  async function createVueRenderer() {
    const app = createApp(VueApp)
    app.mount('#app')
    return {
      destroy: () => app.unmount(),
      updateComponent: updateVueState,
    }
  }
</script>

<div class:full>
  <div id="app"></div>
</div>

<style>
  .full {
    padding: 0.5rem 0.5rem 0;
  }
</style>
