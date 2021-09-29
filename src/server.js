import { config } from './config.js'
import { createServer as createViteServer } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const port = config.serverport

async function createServer() {
  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    server: {
      port,
      proxy: {
        '^/garden/.*/.*/.*': {
          target: `http://localhost:${port}/garden/`,
          rewrite: (path) => {
            const lastFragment = path.split('/').pop()
            return lastFragment.indexOf('.') > 0 ? lastFragment : '' 
          },
        }
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
