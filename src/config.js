import fs from 'fs'
import path from 'path'

export default async function () {
  if (fs.existsSync(path.resolve('garden.config.js'))) {
    console.log('the path is', path.resolve('garden.config.js'))
    const config = await import(path.resolve('garden.config.js'))
    return config.default
  }

  return {garden: {}}
}
