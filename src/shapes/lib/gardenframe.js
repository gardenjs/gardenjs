import {GardenFrame} from 'garden'
import {routes} from '../base.js'
import {componentmap} from '../importmap.js'

const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {routes, componentmap}
})

export default app
