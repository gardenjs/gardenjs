import fs from 'fs'
import path from 'path'

export async function findAndReadDasFiles({basepath, navbasenode}) {
  const promises = (await findDasFiles(basepath)).map(async file => {
    file.das = await readDasFile(file)
    file.navbasenode = navbasenode
    return file
  })
  return await Promise.all(promises)
}

async function findDasFiles(basepath, relativepath = '') {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(path.resolve(basepath, relativepath), {withFileTypes: true}, (err, files) => {
        if (err) {
          reject(err)
        } else {
          const dasfiles = files.filter(file => file.name.match(/^.*\.das\.(js|json)$/i) ).map(file => {return {filename: file.name, relativepath, basepath}})
          const promises = files.filter(file => file.isDirectory()).map(dir => {
            return findDasFiles(basepath, path.join(relativepath, dir.name))
          })
          Promise.all(promises).then((subDasFiles) => {
            resolve(subDasFiles.reduce((acc, cur) => acc.concat(cur), dasfiles))
          })
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

async function readDasFile({filename, relativepath, basepath}) {
  if (isJsonFile(filename)) {
    let content = await fs.promises.readFile(path.resolve(basepath, relativepath, filename), {encoding: 'utf-8'})
    return JSON.parse(content)
  }
  // js file
  const module = await import(path.resolve(basepath, relativepath, filename) + '?' +  Math.random() * 10000)
  return module.default
}

function isJsonFile(filename) {
  return filename.match(/.*\.json$/)
}
