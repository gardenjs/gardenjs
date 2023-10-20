import SvelteApp from './SvelteRenderer.svelte'

async function create() {
  console.log('DEBUG', 'CREATE APP')
  const app = new SvelteApp({
    target: document.getElementById('app'),
  })
  return {
    destroy: () => app.$destroy(),
    updateComponent: (props) => app.$set(props),
  }
}

export default { create }
