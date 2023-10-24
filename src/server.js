import { getConfig } from './config.js'
import open from 'open'
import { createServer as createViteServer } from 'vite'

export async function createServer() {
  const { serverport, vite_config } = await getConfig()

  const configFile = vite_config || './vite.config.js'

  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    configFile,
    root: '.garden/',
    assetsInclude: ['**/*.md'],
  })
  console.log(`Listening to port ${serverport}`)
  console.log(`http://localhost:${serverport}`)
  server.listen()
  open(`http://localhost:${serverport}`)
}
