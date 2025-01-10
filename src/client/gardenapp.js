import GardenApp from './GardenApp.svelte'
import { navTree, routes } from '../base.js'
import { dasMap } from '../das_import_map.js'
import config from '../../garden.config.js'
import './assets/scss/main.scss'
import { mount } from 'svelte'

const app = mount(GardenApp, {
  target: document.getElementById('app'),
  props: { navTree, routes, dasMap, config },
})

export default app
