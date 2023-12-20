async function create() {
  try {
    const { default: SvelteApp } = await import('./SvelteRenderer.svelte')
    const app = new SvelteApp({
      target: document.getElementById('app'),
    })
    return {
      destroy: () => app.$destroy(),
      updateComponent: (props) => app.$set(props),
    }
  } catch (e) {
    console.log('DEBUG', 'error', e)
  }
}

export default { create }
