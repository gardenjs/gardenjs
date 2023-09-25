import { getConfig } from './config.js'
import open from 'open'
import { createServer as createViteServer } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import express from 'express'
import path from 'path'
import fs from 'fs'

export async function createServer() {
  const { serverport, destination } = await getConfig()

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

  const app = express()
  const port = serverport + 1
  app.get('/.garden/raw/', async (req, res) => {
    const file = path.resolve(process.env.PWD, '.' + req.query.file)
    const content = await fs.promises.readFile(file)
    res.append('Access-Control-Allow-Origin', '*')
    res.send(content)
  })
  app.listen(port, () => {
    console.log('listen express server on port', port)
  })
}
