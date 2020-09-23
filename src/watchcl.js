import {watch} from './watch.js'
import {config} from './config.js'
import {generateGardenBase} from './base_generator.js'
import {generateGardenBundle} from './bundle_generator.js'

generate()
watch(config.watch.directories, {include: config.watch.include}, async () => {
  await generate()
})

async function generate() {
  console.log('generate component app')
  await generateGardenBase()
  await generateGardenBundle()
  console.log('generate component app finished')
}
