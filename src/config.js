import fs from 'fs'
import path from 'path'

let config
export async function getConfig() {
  if (!config) {
    config = await readConfig()
  }
  return config
}

async function readConfig() {
  if (fs.existsSync(path.resolve('garden.config.js'))) {
    console.log('the path is', path.resolve('garden.config.js'))
    const config = await import(
      /* @vite-ignore */ path.resolve('garden.config.js')
    )
    return config.default
  }
  return { garden: {} }
}
