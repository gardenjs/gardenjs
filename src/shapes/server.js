import { config } from 'garden'
import { createServer as createViteServer } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const port = config.serverport
const destination = config.destination

async function createServer() {
  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    server: {
      port,
      proxy: {
        '^/garden$': {
          target: `http://localhost:${port}/${destination}/`,
          rewrite: (_path) => ''
        },
        '^/garden/(?!(lib/|gardenframe/)).*/': {
          target: `http://localhost:${port}/${destination}/`,
          rewrite: (_path) => ''
        },
        '^/gardenlib/.*': {
          target: `http://localhost:${port}/${destination}/lib/`,
          rewrite: (path) => path.substring('/gardenlib/'.length)
        },
      }
    },
    plugins: [svelte(
      {compilerOptions: {hydratable: true}}
    )]
  })
  console.log(`Listening to port ${port}`)
  server.listen()
}
createServer()
