import fs from 'fs'
import path from 'path'

const content = fs.existsSync(path.resolve('rabbit.config.json')) ? fs.readFileSync(path.resolve('rabbit.config.json')) : "{}"

// TODO mix default and specific values
export const config = JSON.parse(content).garden

