import {GardenApp} from 'garden'
import {navtree, routes} from '../base.js'
import {dasmap} from '../importmap.js'
import 'garden/src/assets/scss/main.scss'

const app = new GardenApp({
  target: document.body,
  hydrate: true,
  props: {navtree, routes, dasmap}
})

export default app
