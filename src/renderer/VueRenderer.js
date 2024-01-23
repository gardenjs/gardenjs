async function create(afterRenderHook) {
  try {
    const { createApp } = await import('vue')
    const { default: VueApp } = await import('./VueRenderer.vue')
    let app = createApp(VueApp, { afterRenderHook })
    app.mount('#app')
    return {
      destroy: () => app.unmount(),
      updateComponent: (props) => {
        app.unmount()
        app = createApp(VueApp, { ...props, afterRenderHook })
        app.mount('#app')
      },
    }
  } catch (e) {
    console.error(e)
  }
}

export default { create }
