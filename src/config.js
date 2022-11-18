import fs from 'fs'
import path from 'path'

// const content = fs.existsSync(path.resolve('garden.config.js')) ? fs.readFileSync(path.resolve('rabbit.config.json'), 'utf8') : '{"garden": {}}'

// TODO mix default and specific values
// export default JSON.parse(content).garden 

export default async function () {
  if (fs.existsSync(path.resolve('garden.config.js'))) {
    console.log('the path is', path.resolve('garden.config.js'))
    const config = await import(path.resolve('garden.config.js'))
    return config.default
  }

  return {garden: {}}

}
