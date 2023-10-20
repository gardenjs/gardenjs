import { createApp } from 'vue'
import VueApp from './VueRenderer.vue'
import { updateVueState } from './state.js'

async function create() {
  updateVueState({})
  const app = createApp(VueApp)
  app.mount('#app')
  return {
    destroy: () => app.unmount(),
    updateComponent: updateVueState,
  }
}

export default { create }
