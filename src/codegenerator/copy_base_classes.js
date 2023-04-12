import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import config from '../config.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sourcefolder = path.resolve(__dirname, 'shapes') + '/'

export async function clearBaseFolder() {
  console.log('config is', await config())
  const targetfolder = (await config()).destination
  fs.rmSync(targetfolder, { recursive: true, force: true })
}

export async function copyBaseClasses() {
  console.log('config is', await config())
  const targetfolder = (await config()).destination
  fs.mkdir(targetfolder, {recursive: true}, onErrorAbortElse(() => copyFolder(sourcefolder, targetfolder)))
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

function copyFolder(sourcefolder, targetfolder) {
  if (!fs.existsSync(targetfolder)) {
    fs.mkdirSync(targetfolder)
  }
  fs.readdir(sourcefolder, {withFileTypes: true}, (err, files) => {
    if (err) throw err
    files.forEach(f => copyFileOrDirectory(f, sourcefolder, targetfolder))
  })
}

function copyFile(file, target) {
  fs.copyFile(file, target, callback)
}

function copyFileOrDirectory(fileOrDirectory, sourcefolder, targetfolder) {
  const filename = fileOrDirectory.name
  if (fileOrDirectory.isFile()) {
    console.log('COPY FILE', sourcefolder + filename, 'TO', targetfolder + filename)
    fs.copyFile(sourcefolder + filename, targetfolder + filename, callback)
  } else if (fileOrDirectory.isDirectory()) {
    copyFolder(sourcefolder + filename + '/', targetfolder + filename + '/')
  }
}

function callback(err) {
  if (err) throw err
}
