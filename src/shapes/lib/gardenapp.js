import {GardenApp} from 'garden'
import {navtree, routes} from '../base'
import {componentmap} from '../componentmap'
import 'garden/src/assets/scss/main.scss'

const app = new GardenApp({
  target: document.body,
  hydrate: true,
  props: {navtree, routes, componentmap}
})

export default app
