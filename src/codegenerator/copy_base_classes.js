import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { getConfig } from '../config.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sourcefolder = path.resolve(__dirname, 'shapes') + '/'
const distfolder = path.resolve(__dirname, '../../dist') + '/'
const targetfolder = '.garden/'

export async function clearBaseFolder() {
  fs.rmSync(targetfolder, { recursive: true, force: true })
}

export async function copyBaseClasses() {
  const config = await getConfig()

  fs.mkdirSync(targetfolder, { recursive: true })
  copyFolder(sourcefolder, targetfolder)
  copyLogoFile(config.project_logo)
  copyLogoFile(config.project_logo_darkmode)

  if (config.devmodus) return
  copyFolder(distfolder, targetfolder)
}

function copyLogoFile(file) {
  if (!file) {
    return
  }
  try {
    fs.copyFileSync(file, targetfolder + '/assets/' + file.split('/').pop())
  } catch (e) {
    console.error(
      'Could not copy darkmode logo file. Check if file exist and path is correct.',
      e
    )
  }
}

function copyFolder(sourcefolder, targetfolder) {
  if (!fs.existsSync(targetfolder)) {
    fs.mkdirSync(targetfolder)
  }
  const files = fs.readdirSync(sourcefolder, { withFileTypes: true })
  files.forEach((f) => copyFileOrDirectory(f, sourcefolder, targetfolder))
}

function copyFileOrDirectory(fileOrDirectory, sourcefolder, targetfolder) {
  const filename = fileOrDirectory.name
  if (fileOrDirectory.isFile()) {
    console.log(
      'COPY FILE',
      sourcefolder + filename,
      'TO',
      targetfolder + filename
    )
    fs.copyFileSync(sourcefolder + filename, targetfolder + filename)
  } else if (fileOrDirectory.isDirectory()) {
    copyFolder(sourcefolder + filename + '/', targetfolder + filename + '/')
  }
}
