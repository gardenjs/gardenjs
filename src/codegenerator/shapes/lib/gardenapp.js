import { GardenApp } from 'garden'
import { navTree, routes } from '../base.js'
import { dasMap } from '../das_import_map.js'
import config from '../../garden.config.js'
import 'garden/main.scss'

const app = new GardenApp({
  target: document.getElementById('app'),
  props: { navTree, routes, dasMap, config },
})

export default app
