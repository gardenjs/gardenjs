import path from 'path'
import fs from 'fs'
import {findAndReadDasFiles} from './das_file_finder.js'
import config from './config.js'

export async function generateGardenBase() {
  const {structure, destination} = await config()
  const targetBaseFile = destination + 'base.js'
  const targetImportMapFile= destination + 'importmap.js'
  
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
  await writeFileIfChanged(targetImportMapFile, generateImportMapCode(cds))
}

async function writeFileIfChanged(file, content) {
  let oldcontent = ''
  try {
    oldcontent = (await fs.promises.readFile(file)).toString()
  } catch (e) {
    console.log(e)
  }
  if (oldcontent !== content) {
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

export function generateImportMapCode(componentdescriptions) {

  return `
${componentdescriptions.map(createImportStmt).join('\n')}

export const componentmap = {
  ${componentdescriptions.map(createComponentMapEntry).join(',\n')}
}
export const dasmap = {
  ${componentdescriptions.map(createDasMapEntry).join(',\n')}
}
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

export function createImportStmt(description) {
  return `import ${description.fullname} from '${description.file}'
import ${description.fullname}Das from '${description.dasfile}'`
}

export function createComponentMapEntry(description) {
  return `'${description.fullname}': ${description.fullname}`
}

export function createDasMapEntry(description) {
  return `'${description.fullname}': ${description.fullname}Das`
}

export function createComponentDescription({das, navbasenode, basepath, relativepath, filename}) {
  const name = das.name
  const fullname = createFullname(navbasenode, relativepath, name)
  const route = createRoute(navbasenode, relativepath, name)
  const fullnavnode = path.join(navbasenode, relativepath)
  const modulepath = basepath.indexOf('node_modules') == 0 ? basepath.substring('node_modules/'.length) : '../' + basepath
  const file = das.file ? path.join(modulepath, relativepath, das.file) : undefined
  const dasfile = path.join(modulepath, relativepath, filename)
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

