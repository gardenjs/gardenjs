import {GardenApp} from 'garden'
import {navtree, routes} from '../base.js'
import {dasmap} from '../importmap.js'
import config from '../../garden.config.js'
import 'garden/src/client/assets/scss/main.scss'

const app = new GardenApp({
  target: document.body,
  hydrate: true,
  props: {navtree, routes, dasmap, config}
})

export default app
