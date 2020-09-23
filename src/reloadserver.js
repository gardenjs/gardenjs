import websocket from 'websocket'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { config } from './config.js'
const WSS = websocket.server

let init = false

export function initReloadServer() {
  if (init) return
  init = true
  let connections = []
  const server = http.createServer()
  server.listen(config.wssocketport)
  console.log(`WSSocket for reload page listen to port ${config.wssocketport}`)

  const wss = new WSS({
    httpServer: server,
    autoAcceptConnections: false 
  })

  wss.on('request', request => {
    const connection = request.accept('autoreload', request.origin)
    console.log('client registered', request.origin)
    connections.push(connection)
    setTimeout(() => {
      connections = connections.filter(c => c.state === 'open')
    }, 1)
  })

  let waitForUpdate = false

  function watch (pages) {
    pages.forEach(p => {
      console.log('watch dir:', p)
      fs.watch(p, (evt, filename) => {
        if (waitForUpdate) {
          return
        }
        if (watchFileType(filename)) {
          console.log('run update for file:', filename)
          waitForUpdate = true
          // we need a timeout, because the event 'rename' and 'change' are thrown several times for same file
          setTimeout(updateClients, 1000);
        }
      })
    })
  }

  function watchFileType(filename) {
    return /.*\.(?:html|css|svelte|json|scss)$/.test(filename)
  }

  function updateClients () {
    console.log(`update ${connections.length} clients`)
    connections.forEach(c => c.send('reload'))
    waitForUpdate = false
  }

  watch([path.resolve('./garden/build')]);
}
