import {GardenFrame} from 'garden'
import {routes} from '../base'
import {componentmap} from '../componentmap'

const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {routes, componentmap}
})

export default app
