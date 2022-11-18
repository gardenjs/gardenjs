import { config, open } from 'garden'
import { createServer as createViteServer } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

async function createServer() {
  const {serverport, destination} = await config()

  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    server: {
      port: serverport,
      proxy: {
        '^/garden$': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: (_path) => ''
        },
        '^/garden/(?!(lib/|gardenframe/)).*/': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: (_path) => ''
        },
        '^/gardenlib/.*': {
          target: `http://localhost:${serverport}/${destination}/lib/`,
          rewrite: (path) => path.substring('/gardenlib/'.length)
        },
      }
    },
    plugins: [svelte(
      {compilerOptions: {hydratable: true}}
    )]
  })
  console.log(`Listening to port ${serverport}`)
  console.log(`http://localhost:${serverport}/garden`)
  server.listen()
  open(`http://localhost:${serverport}/garden`)
}
createServer()
