import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'

export async function findAndReadDasFiles(
  { basepath, navbasenode },
  getComponentName,
  getComponentFileNames
) {
  const uniqueNames = {}
  const promises = (await findDasFiles(basepath)).map(async (file) => {
    try {
      const das = await readDasFile(
        file,
        getComponentName,
        getComponentFileNames
      )
      await validate(das, file)
      makeNameUnique(das, navbasenode, file.relativepath, uniqueNames)
      uniqueNames[navbasenode + file.relativepath + das.name] = true
      file.das = das
      file.navbasenode = navbasenode
      return file
    } catch (e) {
      console.error(e)
      return undefined
    }
  })
  return (await Promise.all(promises)).filter((das) => das !== undefined)
}

async function validate(das, file) {
  assertIsSet(file, das, 'file')
  await assertFileExist(file, das.file)
}

function assertIsSet(file, das, prop) {
  if (!das[prop])
    throw new Error(
      `Missing property ${prop} in das file ${file.filename} at ${file.relativepath}`
    )
}

function isUnique(fullname, uniqueNames) {
  return uniqueNames[fullname] === undefined
}

function makeNameUnique(das, navbasenode, relativepath, uniqueNames) {
  const name =
    das.name ??
    das.file.substring(das.file.lastIndexOf('/') + 1, das.file.lastIndexOf('.'))
  das.name = name
  if (!isUnique(navbasenode + relativepath + name, uniqueNames)) {
    let counter = 2
    let nameWithCounter = name + '_' + counter
    while (
      !isUnique(navbasenode + relativepath + nameWithCounter, uniqueNames)
    ) {
      counter++
      nameWithCounter = name + '_' + counter
    }
    das.name = nameWithCounter
  }
}

async function assertFileExist(
  { filename, relativepath, basepath },
  relativeComponentFile
) {
  const componentFile = path.resolve(
    basepath,
    relativepath,
    relativeComponentFile
  )
  try {
    await fs.promises.access(componentFile, fs.constants.F_OK)
  } catch {
    throw new Error(
      `Cannost access component file ${componentFile} in ${relativepath}/${filename}. Does the file exist?`
    )
  }
}

async function findDasFiles(
  basepath,
  relativepath = '',
  hooks = [],
  decorators = []
) {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(
        path.resolve(basepath, relativepath),
        { withFileTypes: true },
        async (err, files) => {
          if (err) {
            reject(err)
          } else {
            const hookfiles = files
              .filter((file) => file.name.match(/^.*\.das\.hook\.[jt]s*$/i))
              .map((file) => {
                return {
                  filename: file.name,
                  relativepath,
                  basepath,
                }
              })

            const hookContentPromises = hookfiles.map(async (file) => {
              return {
                ...(await readDasFile(file)),
                ...file,
              }
            })
            const hookContent = await Promise.all(hookContentPromises)

            hooks = [...hooks, ...hookContent]

            const decoratorfiles = files
              .filter((file) => file.name.match(/^.*\.das\.decorator\.[^.]*$/i))
              .map((file) => {
                const extension = file.name.substring(
                  file.name.lastIndexOf('.')
                )
                return {
                  filename: file.name,
                  relativepath,
                  basepath,
                  extension,
                }
              })
            decorators = [...decorators, ...decoratorfiles]
            const dasfiles = files
              .filter((file) => file.name.match(/^.*\.das\.[tj]sx?$/i))
              .map((file) => {
                return {
                  filename: file.name,
                  relativepath,
                  basepath,
                  hooks,
                  decorators,
                }
              })
            const promises = files
              .filter((file) => file.isDirectory())
              .map((dir) => {
                return findDasFiles(
                  basepath,
                  path.join(relativepath, dir.name),
                  hooks,
                  decorators
                )
              })
            Promise.all(promises).then((subDasFiles) => {
              resolve(
                subDasFiles.reduce((acc, cur) => acc.concat(cur), dasfiles)
              )
            })
          }
        }
      )
    } catch (e) {
      reject(e)
    }
  })
}

async function readDasFile(
  { filename, relativepath, basepath },
  getComponentName,
  getComponentFileNames
) {
  let content = await fs.promises.readFile(
    path.resolve(basepath, relativepath, filename),
    { encoding: 'utf-8' }
  )
  // js file
  const module = await import(
    /* @vite-ignore */
    path.resolve(basepath, relativepath, filename) +
      '?' +
      createMd5Hash(content)
  )
  const dasContent = module.default
  if (!dasContent.name) {
    dasContent.name = getComponentName(filename)
  }
  if (!dasContent.file) {
    const potentialFileNames = getComponentFileNames(filename)
    let allFiles = await fs.promises.readdir(
      path.resolve(basepath, relativepath)
    )
    dasContent.file = potentialFileNames.find((candidate) => {
      return allFiles.some((file) => {
        return file === candidate
      })
    }, null)
  }
  return dasContent
}

function createMd5Hash(str) {
  const hash = createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}
