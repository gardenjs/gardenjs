async function create(afterRenderHook) {
  try {
    const { default: SvelteApp } = await import('./SvelteRenderer.svelte')
    let app = new SvelteApp({
      target: document.getElementById('app'),
      props: { afterRenderHook },
    })
    return {
      destroy: () => app?.$destroy?.(),
      updateComponent: (props) => {
        app?.$destroy?.()
        app = new SvelteApp({
          target: document.getElementById('app'),
          props: { ...props, afterRenderHook },
        })
      },
    }
  } catch (e) {
    console.log('DEBUG', 'error', e)
  }
}

export default { create }
