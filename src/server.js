import { getConfig } from './config.js'
import open from 'open'
import { createServer as createViteServer } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export async function createServer() {
  const {serverport, destination} = await getConfig()

  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    configFile: false,
    assetsInclude: ['**/*.md'],
    server: {
      port: serverport,
      proxy: {
        '^/garden$': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: (_path) => {
           return ''
          }
        },
        '^/garden/gardenframe/.*': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: (path) => {
            return path.substring('/garden/'.length)
          }
        },
        '^/garden/(?!(lib/|gardenframe/)).*/': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: (path) => {
            return ''
          }
        },
        '^/gardenlib/.*': {
          target: `http://localhost:${serverport}/${destination}/lib/`,
          rewrite: (path) => {
            return path.substring('/gardenlib/'.length)
          }
        },
      }
    },
    plugins: [svelte( {
      compilerOptions: {hydratable: true},
    }
    )]
  })
  console.log(`Listening to port ${serverport}`)
  console.log(`http://localhost:${serverport}/garden`)
  server.listen()
  open(`http://localhost:${serverport}/garden`)
}
