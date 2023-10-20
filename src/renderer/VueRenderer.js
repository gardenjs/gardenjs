//import { updateVueState } from './state.js'
//import { createApp } from 'vue'
// import VueApp from './VueRenderer.js'

async function create() {
  try {
    const { createApp } = await import('vue')
    const { updateVueState } = await import('./state.js')
    const { default: VueApp } = await import('./VueRenderer.vue')
    updateVueState({})
    const app = createApp(VueApp)
    app.mount('#app')
    return {
      destroy: () => app.unmount(),
      updateComponent: updateVueState,
    }
  } catch (e) {}
}

export default { create }
