import { GardenApp } from 'gardenjs'
import { navTree, routes } from '../base.js'
import { dasMap } from '../das_import_map.js'
import config from '../../garden.config.js'
import 'gardenjs/main.scss'

const app = new GardenApp({
  target: document.getElementById('app'),
  props: { navTree, routes, dasMap, config },
})

export default app
