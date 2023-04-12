#!/usr/bin/env node

import {init} from '../src/codegenerator/watchcl.js'
import {createServer} from '../src/server.js'

async function initAndCreateServer() {
  await init()
  console.log('DEBUG', 'createServer')
  await createServer()
}

initAndCreateServer()

