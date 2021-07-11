import { config } from './config.js'
import { createServer as createViteServer } from 'vite'

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
    }
  })
  console.log(`Listening to port ${port}`)
  server.listen()
}
createServer()
