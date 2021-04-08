import express from 'express'
// import {initReloadServer} from './reloadserver.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { config } from './config.js'
import { createServer as createViteServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const gardenapp_root = '/garden'
//const gardenframe_root = path.resolve(__dirname + '../public/gardenframe')

const port = config.serverport

//async function createServer() {
//  const app = express()
//
//app.use(express.static(__dirname + '/../public'))
//app.use(express.static(__dirname + '/assets'))
//app.use(express.static('src/assets/'))
//app.use(express.static(config.destination))
//
//  // Create vite server in middleware mode. This disables Vite's own HTML
//  // serving logic and let the parent server take control.
//  const vite = await createViteServer({
//    server: { middlewareMode: true },
//    configFile: false,
//    root: '../public/gardenapp.html'
//  })
//  // use vite's connect instance as middleware
//  app.use(vite.middlewares)
//
//
//  app.get("/", componentRoute)
//  app.get("/garden", componentRoute)
//  app.get("/garden/*", componentRoute)
//
//async  function componentRoute(req, res, next) {
//    const filepath = path.resolve(__dirname, '../public/gardenapp.html')
//    const html = fs.readFileSync(filepath, 'utf-8')
////    res.send(html)
//    const result = await vite.transformIndexHtml(req.url, html)
//  console.log(req.url, result)
//    res.send(result)
//  }
//
//  app.get("/gardenframe", componentframeRoute)
//
//  function componentframeRoute(req, res, next) {
//    const filepath = path.resolve(__dirname, '../public/gardenframe.html')
//    const html = fs.readFileSync(filepath, 'utf-8')
//  //  res.send(html)
//    res.send(vite.transformIndexHtml(req.url, html))
//  }
//
//  app.listen(port, () => console.log(`Listening to port ${port}`))
//}

//createServer()

async function createServer() {
  console.log('PROJECT ROOT', process.cwd())
  const server = await createViteServer({
    server: {
      port
    }
  })
  console.log(`Listening to port ${port}`)
  server.listen()
}
createServer()
