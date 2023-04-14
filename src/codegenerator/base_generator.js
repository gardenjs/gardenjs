import path from 'path'
import fs from 'fs'
import {findAndReadDasFiles} from './das_file_finder.js'
import {getConfig} from '../config.js'

export async function generateGardenBase() {
  const {structure, destination, additional_style_files, welcome_page} = await getConfig()
  const targetBaseFile = destination + 'base.js'
  const targetComponentMapFile= destination + 'component_import_map.js'
  const targetDasMapFile= destination + 'das_import_map.js'
  const targetGardenFrameFile = destination + '/lib/gardenframe.js'
  
  const basefolders = getDasBaseFolders(structure)

  const cds = await basefolders.reduce(async (acc, basePathAndNode) => {
    const filemetaAndDasArray = await findAndReadDasFiles(basePathAndNode)
    try {
      return (await acc).concat(filemetaAndDasArray.map(createComponentDescription))
    } catch (e) {
      console.error(e)
      return acc
    }
  }, [])

  await writeFileIfChanged(targetBaseFile, generateBaseCode(cds))
  await writeFileIfChanged(targetComponentMapFile, generateComponentMapCode(cds, welcome_page))
  await writeFileIfChanged(targetDasMapFile, generateDasMapCode(cds))
  await writeFileIfChanged(targetGardenFrameFile, generateGardenFrameFile(additional_style_files))
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
      const basepath = structure[node].indexOf('/') == 0 ? structure[node].substring(1) : 'node_modules/' + structure[node] 
      folders.push({navbasenode: basenode, basepath})
    }
    else {
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

export const navtree = ${JSON.stringify(createNavItemTree(componentdescriptions), null, 2)}
`
}

export function generateComponentMapCode(componentdescriptions, welcome_page = '../garden/Hellogarden.svelte') {
  return `
${componentdescriptions.map(createComponentImportStmt).join('\n')}

import Welcome from '${welcome_page}' 

export const componentmap = {
  'Welcome': Welcome,
  ${componentdescriptions.map(createComponentMapEntry).join(',\n')}
}
`
}

export function generateDasMapCode(componentdescriptions) {
  return `
${componentdescriptions.map(createDasImportStmt).join('\n')}
export const dasmap = {
  ${componentdescriptions.map(createDasMapEntry).join(',\n')}
}
`
}

function generateGardenFrameFile(stylefiles = []) {
  return stylefiles.map(file => {
    return `import '../../${file}'`
  }).join('\n') + `

import {GardenFrame} from 'garden'
import {dasmap} from '../das_import_map.js'
import {componentmap} from '../component_import_map.js'
import config from '../../garden.config.js'
 
const app = new GardenFrame({
  target: document.body,
  hydrate: true,
  props: {componentmap, dasmap, config}
})

export default app
  `
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
  nodes.split('/').forEach(node => {
    key += node  + '/' 
    let childNode = parentNode.find(node => node.key === key)
    if (!childNode) {
      childNode = {
        isNode: true,
        name: node,
        key,
        children: []
      }
      parentNode.push(childNode)
    }
    parentNode = childNode.children
  })
  return parentNode
}
export function createNavigationEntry(description) {
  return {isLeaf: true, href: description.route, name: description.name, key: description.fullname}
}

export function createRouteEntry(description) {
  return `'${description.route}': ${JSON.stringify(description, null, 2)}`
}

export function createComponentImportStmt(description) {
  return `import ${description.fullname} from '${description.file}'`
}

export function createDasImportStmt(description) {
  return `import ${description.fullname}Das from '${description.dasfile}'
${createDescriptionImportStmt(description)}`
}

function createDescriptionImportStmt(description) {
  return description.descriptionfile ? `import ${description.fullname}DasDescription from '${description.descriptionfile}?raw'` : ''
}

export function createComponentMapEntry(description) {
  return `'${description.fullname}': ${description.fullname}`
}

export function createDasMapEntry(description) {
  return `'${description.fullname}': {
    ...${description.fullname}Das,
    description: ${getDescriptionFromFileOrProperty(description)} 
  }`
}

function getDescriptionFromFileOrProperty(description) {
  return description.descriptionfile ? `${description.fullname}DasDescription` : `${description.fullname}Das.description`

}

export function createDasDescriptionMapEntry(description) {
  return `'${description.fullname}': ${description.fullname}DasDescription`
}

export function createComponentDescription({das, navbasenode, basepath, relativepath, filename}) {
  const name = das.name
  const fullname = createFullname(navbasenode, relativepath, name)
  const route = createRoute(navbasenode, relativepath, name)
  const fullnavnode = path.join(navbasenode, relativepath)
  const modulepath = basepath.indexOf('node_modules') == 0 ? basepath.substring('node_modules/'.length) : '/' + basepath
  const file = das.file ? path.join(modulepath, relativepath, das.file) : undefined
  const dasfile = path.join(modulepath, relativepath, filename)
  const descriptionfile = das.description?.endsWith('.md') ? path.join(modulepath, relativepath, das.description) : undefined
  const fullpath = path.join(basepath, relativepath)
  return {
    name,
    basepath,
    navbasenode,
    fullnavnode,
    relativepath,
    fullpath,
    file,
    dasfile,
    descriptionfile,
    fullname,
    route
  }
}

export function createRoute(navfolder, relativepath, name) {
  return '/' + []
    .concat(navfolder.split('/'))
    .concat(relativepath.split('/'))
    .concat([name.toLocaleLowerCase()])
    .filter(p => p.length > 0)
    .join('/')
}

function createFullname(navfolder, relativepath, name) {
  return navfolder.split('/').concat(relativepath.split('/')).concat([name]).map(firstLetterToUpperCase).join('')
}

function firstLetterToUpperCase(elem) {
  return elem.substring(0,1).toUpperCase() + elem.substring(1)
}

