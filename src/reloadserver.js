import websocket from 'websocket'
import http from 'http'
import { config } from './config.js'
const WSS = websocket.server

let init = false

let connections = []

export function updateClients () {
  console.log(`update ${connections.length} clients`)
  connections.forEach(c => c.send('reload'))
}

export function initReloadServer() {
  if (init) return
  init = true
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
}
