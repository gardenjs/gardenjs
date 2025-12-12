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
  return (
    (await tryRead('garden.config.js')) ??
    (await tryRead('garden.config.ts')) ?? { garden: {} }
  )
}

async function tryRead(filename) {
  if (fs.existsSync(path.resolve(filename))) {
    console.log('the path is', path.resolve(filename))
    const config = await import(/* @vite-ignore */ path.resolve(filename))
    return config.default
  }
  return undefined
}
