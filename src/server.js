import { getConfig } from './config.js'
import open from 'open'
import { createServer as createViteServer } from 'vite'

export async function createServer() {
  const { serverport, vite_config, devmodus, no_open_browser } =
    await getConfig()

  const configFile = vite_config || './vite.config.js'

  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    configFile,
    root: '.garden/',
    assetsInclude: ['**/*.md'],
    server: {
      port: serverport,
    },
  })
  console.log(`Listening to port ${serverport}`)
  server.listen()
  if (devmodus) {
    console.log('!!!!RUNNING IN DEVELOPMENT-MODUS!!!!')
  }
  console.log('')
  console.log(`Goto -> http://localhost:${serverport}`)
  console.log('')
  if (!no_open_browser) open(`http://localhost:${serverport}`)
}
