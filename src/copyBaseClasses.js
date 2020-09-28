import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from './config.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const targetfolder = config.destination
const sourcefolder = path.resolve(__dirname, 'shapes/')

export async function copyBaseClasses() {
  fs.mkdir(targetfolder + '/build', {recursive: true}, onErrorAbortElse(copyBaseFiles))
}

function onErrorAbortElse(func) {
  return (err) => {
    if (err) {
      console.log(err)
      throw err
    }
    func()
  }
}

function copyBaseFiles() {
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
