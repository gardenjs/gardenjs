import { getConfig } from './config.js'
import open from 'open'
import { createServer as createViteServer } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import express from 'express'
import path from 'path'
import fs from 'fs'

export async function createServer() {
  const {serverport, destination} = await getConfig()

  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    configFile: false,
    assetsInclude: ['**/*.md'],
    server: {
      port: serverport,
      proxy: {
        '^/garden/?$': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: () => ''
        },
        '^/garden/gardenframe/.*': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: (path) => {
            return path.substring('/garden/'.length)
          }
        },
        '^/gardenfavicon$': {
          target: `http://localhost:${serverport}/${destination}/assets/favicon.svg`,
          rewrite: () => ''
        },
        '^/garden/(?!(lib/|gardenframe/)).*/': {
          target: `http://localhost:${serverport}/${destination}/`,
          rewrite: () => ''
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

  const app = express()
  const port = serverport + 1 
  app.get('/garden/raw/', async(req, res) => {
    const file = path.resolve(process.env.PWD, '.' + req.query.file)
    const content = await fs.promises.readFile(file)
    res.append('Access-Control-Allow-Origin', '*')
    res.send(content)
  })
  app.listen(port, () => {
    console.log('listen express server on port', port)
  })
}
