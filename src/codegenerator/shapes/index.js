import {init} from 'garden'

async function initThenRunServer() {
  await init()
  const {createServer} = await import('./server.js')
  await createServer()
}

initThenRunServer()
