import {GardenApp} from 'garden'
import {navtree, routes, dynamicImport, componentmap} from './clbase'
import 'garden/src/assets/scss/main.scss'

const app = new GardenApp({
  target: document.body,
  hydrate: true,
  props: {navtree, routes, dynamicImport, componentmap}
})

export default app
