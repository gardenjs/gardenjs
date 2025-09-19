import { GardenApp } from 'gardenjs'
import { navTree, routes } from '../base.js'
import { dasMap } from '../das_import_map.js'
import { mount } from 'svelte'
import config from '../../garden.config.js'
import 'gardenjs/main.scss'

const app = mount(GardenApp, {
  target: document.getElementById('app'),
  props: { navTree, routes, dasMap, config },
})

export default app
