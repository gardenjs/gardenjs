import {GardenApp} from 'garden'
import {navtree, routes} from '../base.js'
import {dasmap, dasdescriptionmap} from '../importmap.js'
import config from '../../garden.config.js'
import 'garden/src/assets/scss/main.scss'

const app = new GardenApp({
  target: document.body,
  hydrate: true,
  props: {navtree, routes, dasmap, dasdescriptionmap, config}
})

export default app
