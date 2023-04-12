import config from '../config.js'
import {watch} from './watch.js'
import {generateGardenBase} from './base_generator.js'

generate()
readConfigThenWatch()

async function generate() {
  console.log('generate component app')
  await generateGardenBase()
  console.log('generate component app finished')
}

async function readConfigThenWatch() {
  const {directories, include} = (await config()).watch
  watch(directories, { include }, async () => {
    await generate()
  })
}
