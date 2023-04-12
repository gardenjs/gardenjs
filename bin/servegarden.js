#!/usr/bin/env node

import {init} from '../src/codegenerator/watchcl.js'
import {createServer} from '../src/server.js'

async function initAndCreateServer() {
  await init()
  await createServer()
}

initAndCreateServer()

