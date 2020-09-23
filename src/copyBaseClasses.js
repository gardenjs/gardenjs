import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from './config.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function copyBaseClasses() {

  const targetfolder = config.destination
  const sourcefolder = path.resolve(__dirname, 'shapes/')

  fs.readdir(sourcefolder, (err, files) => {
    if (err) throw err
  
    files.forEach(f => copyFile(sourcefolder + '/' + f, targetfolder + f))
  })
}

function copyFile(file, target) {
  fs.copyFile(file, target, callback)
}

function callback(err) {
  if (err) throw err
}
