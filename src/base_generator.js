import path from 'path'
import fs from 'fs'
import {findAndReadDasFiles} from './das_file_finder.js'
import {config} from './config.js'

export async function generateGardenBase(targetFile = config.destination + 'clbase.js') {

  const basefolders = getDasBaseFolders(config.structure)

  const cds = await basefolders.reduce(async (acc, basePathAndNode) => {
    const filemetaAndDasArray = await findAndReadDasFiles(basePathAndNode)
    try {
      return (await acc).concat(filemetaAndDasArray.map(createComponentDescription))
    } catch (e) {
      console.error(e)
      return acc
    }
  }, [])

  const code = generateCode(cds)
  await fs.promises.writeFile(targetFile, code)
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

export function generateCode(componentdescriptions) {
  return `
${componentdescriptions.map(createImportStmt).join('\n')}

export const routes = {
  ${componentdescriptions.map(createRouteEntry).join(',\n')}
}

export const navtree = ${JSON.stringify(createNavItemTree(componentdescriptions), null, 2)}

export const componentmap = {
  ${componentdescriptions.map(createComponentKeyMapEntry).join(',\n')}
}

export const dynamicImport = {
  Sidenav: () => import ('componentlib/src/components/sidenav/SidenavExample.svelte')
}
`
}

export function createNavItemTree(componentDescriptions) {
  const tree = {}
  for (const componentDescription of componentDescriptions) {
    const parentNode = createNode(tree, componentDescription.fullnavnode)
    parentNode.push(createNavigationEntry(componentDescription))
  }
  return tree
}

export function createNode(tree, nodes) { 
  let parentNode = tree
  nodes.split('/').forEach(node => {
    if (!parentNode[node]) {
      parentNode[node] = {}
    }
    parentNode = parentNode[node]
  })
  if (!parentNode._items) parentNode._items = []
  return parentNode._items
}

export function createNavigationEntry(description) {
  return {href: description.route, text: description.das.name, key: description.fullname}
}


export function createRouteEntry(description) {
  return `'${description.route}': ${JSON.stringify(description, null, 2)}`
}

export function createImportStmt(description) {
  return `import ${description.fullname} from '${description.file}'`
}

export function createComponentKeyMapEntry(description) {
  return `'${description.fullname}': ${description.fullname}`
}

export function createComponentDescription({das, navbasenode, basepath, relativepath}) {
  const fullname = createFullname(navbasenode, relativepath, das.name)
  const route = createRoute(navbasenode, relativepath, das.name)
  const fullnavnode = path.join(navbasenode, relativepath)
  const modulepath = basepath.indexOf('node_modules') == 0 ? basepath.substring('node_modules/'.length) : '../' + basepath
  const file = das.file ? path.join(modulepath, relativepath, das.file) : undefined
  const fullpath = path.join(basepath, relativepath)
  return {
    das,
    basepath,
    navbasenode,
    fullnavnode,
    relativepath,
    fullpath,
    file,
    fullname,
    route
  }
}

export function createRoute(navfolder, relativepath, name) {
  return ['']
    .concat(navfolder.split('/'))
    .concat(relativepath.split('/'))
    .concat([name.toLocaleLowerCase()])
    .join('/')
}

function createFullname(navfolder, relativepath, name) {
  return navfolder.split('/').concat(relativepath.split('/')).concat([name]).map(firstLetterToUpperCase).join('')
}

function firstLetterToUpperCase(elem) {
  return elem.substring(0,1).toUpperCase() + elem.substring(1)
}

