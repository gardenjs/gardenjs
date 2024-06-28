import { getConfig } from './config.js'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
import { dirname } from 'path'
import path from 'path'
const __dirname = dirname(__filename)

import open from 'open'
import { createServer as createViteServer } from 'vite'

export async function createServer() {
  const { serverport, vite_config, devmodus, no_open_browser } =
    await getConfig()

  const configFile = vite_config || './vite.config.js'

  const server = await createViteServer({
    configFile,
    optimizeDeps: {
      noDiscovery: true,
    },
    server: {
      port: serverport,
      fs: {
        cachedChecks: false,
      },
    },
  })
  await runWatch(server)

  if (devmodus) {
    console.log('!!!!RUNNING IN DEVELOPMENT-MODUS!!!!')
  }

  server.listen()
  if (!no_open_browser) open(`http://localhost:${serverport}`)
}

import { ViteNodeServer } from 'vite-node/server'
import { ViteNodeRunner } from 'vite-node/client'
import { installSourcemapsSupport } from 'vite-node/source-map'

async function runWatch(server) {
  await server.pluginContainer.buildStart({})

  // create vite-node server
  const node = new ViteNodeServer(server)

  // fixes stacktraces in Errors
  installSourcemapsSupport({
    getSourceMap: (source) => node.getSourceMap(source),
  })

  // create vite-node runner
  const runner = new ViteNodeRunner({
    root: server.config.root,
    base: server.config.base,
    // when having the server and runner in a different context,
    // you will need to handle the communication between them
    // and pass to this function
    fetchModule(id) {
      return node.fetchModule(id)
    },
    resolveId(id, importer) {
      return node.resolveId(id, importer)
    },
  })

  // execute the file
  const watchfile = path.resolve(__dirname, 'codegenerator/watchcl.js')
  await runner.executeFile(watchfile)
}
