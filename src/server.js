import { getConfig } from './config.js'
import open from 'open'
import { createServer as createViteServer } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export async function createServer() {
  const { serverport } = await getConfig()

  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    root: '.garden/',
    configFile: false,
    assetsInclude: ['**/*.md'],
    server: {
      port: serverport,
    },
    plugins: [
      svelte({
        compilerOptions: { hydratable: true },
      }),
    ],
  })
  console.log(`Listening to port ${serverport}`)
  console.log(`http://localhost:${serverport}`)
  server.listen()
  open(`http://localhost:${serverport}`)
}
