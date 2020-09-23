import express from 'express'
import {initReloadServer} from './reloadserver.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { config } from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

const port = config.serverport

app.use(express.static(__dirname + '/../public'))
app.use(express.static(__dirname + '/assets'))
app.use('Fonts', express.static(__dirname + '/assets/fonts'))
app.use(express.static(config.destination))

app.get("/garden", componentRoute)
app.get("/garden/*", componentRoute)

function componentRoute(req, res, next) {
  const filepath = path.resolve(__dirname, '../public/gardenapp.html')
  const html = fs.readFileSync(filepath, 'utf-8')
  res.send(html)
}

app.get("/gardenframe", componentframeRoute)

function componentframeRoute(req, res, next) {
  const filepath = path.resolve(__dirname, '../public/gardenframe.html')
  const html = fs.readFileSync(filepath, 'utf-8')
  res.send(html)
}

initReloadServer()
app.listen(port, () => console.log(`Listening to port ${port}`))
