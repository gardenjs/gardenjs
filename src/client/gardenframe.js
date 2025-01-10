import GardenFrame from './GardenFrame.svelte'
import { dasMap } from '../das_import_map.js'
import { componentMap } from '../component_import_map.js'
import config from '../../garden.config.js'
import { mount } from 'svelte'

const app = mount(GardenFrame, {
  target: document.body,
  props: { componentMap, dasMap, config },
})

export default app
