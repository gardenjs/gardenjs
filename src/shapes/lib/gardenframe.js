import {GardenFrame} from 'garden'
import {routes} from '../base.js'
import {componentmap, dasmap} from '../importmap.js'

const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {routes, componentmap, dasmap}
})

export default app
