import {GardenFrame} from 'garden'
import {routes, dynamicImport, componentmap} from '../clbase'

const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {routes, dynamicImport, componentmap}
})

export default app
