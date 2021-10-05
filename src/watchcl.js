import {watch} from './watch.js'
import config from './config.js'
import {generateGardenBase} from './base_generator.js'

generate()
watch(config.watch.directories, {include: config.watch.include}, async (evt) => {
  await generate()
})

async function generate() {
  console.log('generate component app')
  await generateGardenBase()
  console.log('generate component app finished')
}
