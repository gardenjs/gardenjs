import {GardenFrame} from 'garden'
import {componentmap} from './clbase'
import '../src/assets/scss/main.scss'

const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {componentmap}
})

export default app
