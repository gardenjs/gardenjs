import {getConfig} from '../config.js'
import {watch} from './watch.js'
import {generateGardenBase} from './base_generator.js'
import {clearBaseFolder, copyBaseClasses} from './copy_base_classes.js'

export async function init() {
  await clearBaseFolder()
  await copyBaseClasses()
  await generate()
  readConfigThenWatch()
}

async function generate() {
  console.log('generate component app')
  await generateGardenBase()
  console.log('generate component app finished')
}

async function readConfigThenWatch() {
  const {directories, include} = (await getConfig()).watch
  watch(directories, { include }, async () => {
    await generate()
  })
}
