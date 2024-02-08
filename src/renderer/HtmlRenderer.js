import HtmlApp from './HtmlRenderer.svelte'
async function create(afterRenderHook) {
  try {
    let app = new HtmlApp({
      target: document.getElementById('garden_app'),
      props: { afterRenderHook },
    })
    return {
      destroy: () => app.$destroy(),
      updateComponent: (props) => {
        app.$destroy()
        app = new HtmlApp({
          target: document.getElementById('garden_app'),
          props: { ...props, afterRenderHook },
        })
      },
    }
  } catch (e) {
    console.log('DEBUG', 'error', e)
  }
}

export default { create }
