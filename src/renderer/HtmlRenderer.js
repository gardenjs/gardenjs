import HtmlApp from './HtmlRenderer.svelte'
import { mount, unmount } from 'svelte'

async function create(afterRenderHook) {
  try {
    let app = mount(HtmlApp, {
      target: document.getElementById('garden_app'),
      props: { afterRenderHook },
    })
    return {
      destroy: () => unmount(app),
      updateComponent: (props) => {
        unmount(app)
        app = mount(HtmlApp, {
          target: document.getElementById('garden_app'),
          props: { ...props, afterRenderHook },
        })
      },
    }
  } catch (e) {
    console.log('error', e)
  }
}

export default { create }
