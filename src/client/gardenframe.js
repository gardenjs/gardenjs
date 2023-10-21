import GardenFrame from './GardenFrame.svelte'
import { dasMap } from '../das_import_map.js'
import { componentMap } from '../component_import_map.js'
import config from '../../garden.config.js'

const app = new GardenFrame({
  target: document.body,
  props: { componentMap, dasMap, config },
})

export default app
