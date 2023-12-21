import { getConfig } from '../config.js'
import { watch } from './watch.js'
import { generateGardenBase } from './base_generator.js'
import { clearBaseFolder, copyBaseClasses } from './copy_base_classes.js'

export async function init() {
  const { watch: watchconfig, serverport } = await getConfig()
  const { directories, include } = watchconfig
  await clearBaseFolder()
  await copyBaseClasses()
  await generate(serverport)
  watch(directories, { include: include }, async () => {
    await generate()
  })
}

async function generate(serverport) {
  console.clear()
  console.log('PROJECT ROOT: ', process.cwd())
  console.log('')
  console.log('generate Gardenjs')
  console.log('======================')
  console.log('')
  await generateGardenBase()
  console.log('')
  console.log('======================')
  console.log('')
  console.log('generate Gardenjs finished')
  console.log('')
  console.log(`Listen at -> http://localhost:${serverport}`)
  console.log('')
  console.log('======================')
  console.log('')
}
