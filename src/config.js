import fs from 'fs'
import path from 'path'

const content = fs.existsSync(path.resolve('rabbit.config.json')) ? fs.readFileSync(path.resolve('rabbit.config.json'), 'utf8') : '{"garden": {}}'

// TODO mix default and specific values
export default JSON.parse(content).garden 
