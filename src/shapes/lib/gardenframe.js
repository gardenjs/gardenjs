import {GardenFrame} from 'garden'
import {routes} from '../base.js'
import {componentmap, dasmap} from '../importmap.js'
// import config from './rabbit.config.js'
// 
// if (config.additional_style_files) {
//   config.additional_style_files.forEach(style_file) {
//     await import(css_file)
//   }
// }

const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {routes, componentmap, dasmap}
})

export default app
