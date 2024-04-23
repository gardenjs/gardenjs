import path from 'path'
import fs from 'fs'
import { findAndReadDasFiles } from './das_file_finder.js'
import { getConfig } from '../config.js'

const pathRelativeToGarden = '../'

export async function generateGardenBase() {
  const destination = '.garden/'
  const { structure, additional_style_files, welcome_page, devmodus } =
    await getConfig()
  const targetBaseFile = destination + 'base.js'
  const targetComponentMapFile = destination + 'component_import_map.js'
  const targetRawComponentMapFile = destination + 'raw_component_import_map.js'
  const targetDasMapFile = destination + 'das_import_map.js'
  const targetGardenFrameFile = destination + 'gardenframe/gardenframe.js'
  const targetGardenFrameCssFile = destination + 'gardenframe/cssimport.js'

  const basefolders = getDasBaseFolders(structure)

  const cds = await basefolders.reduce(async (acc, basePathAndNode) => {
    const filemetaAndDasArray = await findAndReadDasFiles(basePathAndNode)
    try {
      return (await acc).concat(
        filemetaAndDasArray.map(createComponentDescription)
      )
    } catch (e) {
      console.error(e)
      return acc
    }
  }, [])

  await writeFileIfChanged(targetBaseFile, generateBaseCode(cds))
  await writeFileIfChanged(
    targetComponentMapFile,
    generateComponentMapCode(cds, welcome_page)
  )
  await writeFileIfChanged(
    targetRawComponentMapFile,
    generateRawComponentMapCode(cds)
  )
  await writeFileIfChanged(targetDasMapFile, generateDasMapCode(cds))

  await writeFileIfChanged(
    targetGardenFrameCssFile,
    generateCssImportFile(additional_style_files)
  )
  if (devmodus) {
    await writeFileIfChanged(
      targetGardenFrameFile,
      generateGardenFrameFile(additional_style_files)
    )
  }
}

async function writeFileIfChanged(file, content) {
  let oldcontent = ''
  try {
    if (fs.existsSync(file)) {
      oldcontent = (await fs.promises.readFile(file)).toString()
    }
  } catch (e) {
    console.log(e)
  }
  if (oldcontent !== content) {
    console.log('Write file', file)
    await fs.promises.writeFile(file, content)
  }
}

export function getDasBaseFolders(structure, navbasenode) {
  let folders = []
  for (const node in structure) {
    const basenode = navbasenode ? navbasenode + '/' + node : node
    if (typeof structure[node] == 'string') {
      const basepath = structure[node]
      folders.push({ navbasenode: basenode, basepath })
    } else {
      folders = folders.concat(getDasBaseFolders(structure[node], basenode))
    }
  }
  return folders
}

export function generateBaseCode(componentdescriptions) {
  return `
export const routes = {
  ${componentdescriptions.map(createRouteEntry).join(',\n')}
}

export const navTree = ${JSON.stringify(
    createNavItemTree(componentdescriptions),
    null,
    2
  )}
`
}

export function generateComponentMapCode(
  componentdescriptions,
  welcome_page = './Hellogarden.html'
) {
  return `
${componentdescriptions.map(createComponentImportStmt).join('\n')}

import Welcome from '${welcome_page}?raw' 

export const componentMap = {
  'Welcome': Welcome,
  ${componentdescriptions.map(createComponentMapEntry).join(',\n')}
}
`
}

export function generateRawComponentMapCode(componentdescriptions) {
  return `
${componentdescriptions.map(createRawComponentImportStmt).join('\n')}

export const rawComponentMap = {
  ${componentdescriptions.map(createComponentMapEntry).join(',\n')}
}
`
}

export function generateDasMapCode(componentdescriptions) {
  const decorators = componentdescriptions.flatMap((cd) => cd.decorators)
  const added = {}
  const hooks = componentdescriptions
    .flatMap((cd) => cd.hooks)
    .filter((hook) => {
      if (added[hook.fullname]) {
        return false
      }
      added[hook.fullname] = true
      return true
    })
  return `
${componentdescriptions.map(createDasImportStmt).join('\n')}
${Array.from(new Set(decorators.map(createDecoratorImportStmt))).join('\n')}
${hooks.map(createHookImportStmt).join('\n')}
${hooks.map(createHookEntry).join('\n')}

export const dasMap = {
  ${componentdescriptions.map(createDasMapEntry).join(',\n')}
}
`
}

function generateCssImportFile(stylefiles = []) {
  return (
    stylefiles
      .map((file) => {
        return `import '../../${file}'`
      })
      .join('\n') || '// no custom css scripts'
  )
}

function generateGardenFrameFile(stylefiles = []) {
  return (
    stylefiles
      .map((file) => {
        return `import '../../${file}'`
      })
      .join('\n') +
    `

import GardenFrame from 'gardenjs/GardenFrame'
import {dasMap} from '../das_import_map.js'
import {componentMap} from '../component_import_map.js'
import config from '../../garden.config.js'
 
const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {componentMap, dasMap, config}
})

export default app
  `
  )
}

export function createNavItemTree(componentDescriptions) {
  const rootNode = []
  for (const componentDescription of componentDescriptions) {
    const parentNode = createNode(rootNode, componentDescription.fullnavnode)
    parentNode.push(createNavigationEntry(componentDescription))
  }
  return rootNode
}

export function createNode(rootNode, nodes) {
  let parentNode = rootNode
  let key = '/'
  nodes.split('/').forEach((node) => {
    key += node + '/'
    let childNode = parentNode.find((node) => node.key === key)
    if (!childNode) {
      childNode = {
        isNode: true,
        name: node,
        key,
        children: [],
      }
      parentNode.push(childNode)
    }
    parentNode = childNode.children
  })
  return parentNode
}

function createNavigationEntry(description) {
  return {
    isLeaf: true,
    href: description.route,
    name: description.displayname,
    key: description.fullname,
  }
}

function createRouteEntry(description) {
  return `'${description.route}': ${JSON.stringify(description, null, 2)}`
}

function createComponentImportStmt(description) {
  return `import ${description.fullname} from '${pathRelativeToGarden}${description.file}'`
}

function createRawComponentImportStmt(description) {
  return `import ${description.fullname} from '${pathRelativeToGarden}${description.file}?raw'`
}

function createDasImportStmt(description) {
  const dasImportStmt = `import ${description.fullname}Das from '${pathRelativeToGarden}${description.dasfile}'`
  const descriptionImportStmt = description.descriptionfile
    ? '\n' + createDescriptionImportStmt(description)
    : ''
  return dasImportStmt + descriptionImportStmt
}

function createDecoratorImportStmt(decorator) {
  return `import ${decorator.fullname} from '${decorator.fullpath}'`
}

function createHookImportStmt(hook) {
  return `import ${hook.fullname}Import from '${hook.fullpath}'`
}

function createHookEntry(hook) {
  return `const ${hook.fullname} = {...${JSON.stringify(hook)}, ...${
    hook.fullname
  }Import}`
}

function createDescriptionImportStmt(description) {
  return description.descriptionfile
    ? `import ${description.fullname}DasDescription from '${pathRelativeToGarden}${description.descriptionfile}?raw'`
    : ''
}

function createComponentMapEntry(description) {
  return `'${description.fullname}': ${description.fullname}`
}

function createDasMapEntry(description) {
  return `'${description.fullname}': {
    ...${description.fullname}Das,
    ${
      description.decorators
        ? 'decorators: [' +
          description.decorators
            .filter((decorator) => {
              return decorator.extension === description.extension
            })
            .map((decorator) => decorator.fullname)
            .join(', ') +
          ']'
        : '[]'
    },
    ${
      description.hooks
        ? 'hooks: [' +
          description.hooks.map((hook) => hook.fullname).join(', ') +
          ']'
        : '[]'
    },
    ${
      description.descriptionfile
        ? 'description : ' + description.fullname + 'DasDescription'
        : ''
    }
  }`
}

function createComponentDescription({
  das,
  navbasenode,
  basepath,
  relativepath,
  filename,
  hooks,
  decorators,
}) {
  const name = das.name.replaceAll(' ', '_')
  const displayname = das.name
  const extension = das.file.substring(das.file.lastIndexOf('.'))
  const fullname = createFullname(navbasenode, relativepath, name)
  const route = createRoute(navbasenode, relativepath, name)
  const fullnavnode = path.join(navbasenode, relativepath)
  const file = das.file
    ? path.join(basepath, relativepath, das.file)
    : undefined
  const dasfile = path.join(basepath, relativepath, filename)
  const descriptionfile = das.description?.endsWith('.md')
    ? path.join(basepath, relativepath, das.description)
    : undefined
  const fullpath = path.join(basepath, relativepath)

  hooks = hooks.map((hook) => {
    return {
      ...hook,
      fullname: createFullname(navbasenode, hook.relativepath, hook.filename),
      fullpath: path.join(
        pathRelativeToGarden,
        basepath,
        hook.relativepath,
        hook.filename
      ),
    }
  })

  const dasDecorator = das.decorator
    ? [
        {
          basepath,
          relativepath,
          filename: das.decorator,
          extension,
        },
      ]
    : []

  decorators = [...decorators, ...dasDecorator].map(
    ({ basepath, relativepath, filename, extension }) => {
      return {
        fullname: createFullname(navbasenode, relativepath, filename),
        fullpath: path.join(
          pathRelativeToGarden,
          basepath,
          relativepath,
          filename
        ),
        extension,
      }
    }
  )
  return {
    name,
    displayname,
    basepath,
    navbasenode,
    fullnavnode,
    relativepath,
    fullpath,
    file,
    dasfile,
    descriptionfile,
    extension,
    fullname,
    route,
    decorators,
    hooks,
  }
}

export function createRoute(navfolder, relativepath, name) {
  return (
    '/' +
    []
      .concat(navfolder.split('/'))
      .concat(relativepath.split('/'))
      .concat([name.toLocaleLowerCase()])
      .filter((p) => p.length > 0)
      .join('/')
  )
}

function createFullname(navfolder, relativepath, name) {
  return navfolder
    .split('/')
    .concat(relativepath.split('/'))
    .concat([name.replaceAll('.', '')])
    .map(firstLetterToUpperCase)
    .join('')
}

function firstLetterToUpperCase(elem) {
  return elem.substring(0, 1).toUpperCase() + elem.substring(1)
}
