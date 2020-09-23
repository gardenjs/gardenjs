import {default as chai} from 'chai'
const expect = chai.expect
import {generateCode, createImportStmt, createRouteEntry, createNavigationEntry, createNavItemTree, createComponentDescription, getDasBaseFolders } from '../src/base_generator.js'
import {findAndReadDasFiles} from '../src/das_file_finder.js'

describe('generate component', () => {
  it.skip('generates code', () => {
    const componentfiles = [
      {filename: './AnyComponent.svelte'}, {filename: './AnotherComponent.svelte'}]
    const code = 'todo' + componentfiles //generateCodeFor(componentfiles)
    console.log(code)
  })
  it.skip('todo, test if this works', () => {
    // generateComponentApp('/test/component_app_generator_test_folder/ComponentApp.svelte', './components/')
  })
  describe('generateCode', () => {
    it('creates code for given componentdescriptions', () => {
      const cds = [createSampleComponentDescription({name: 'C1'}), createSampleComponentDescription({name: 'C2'})]
      const code = generateCode(cds)
      const expectedCode = getExpectedCode1()
      expect(code).equals(expectedCode)
    })
  })
  describe('getDasBaseFolders', () => {
    it('returns all basefolders for given config', () => {
      const config = {
        foundation: {
          components: 'some/folder',
          elements: 'some/otherfolder',
          layouts: 'some/layoutfolder'
        },
        custom: {
          components: '/src/components',
          elements: '/src/elements',
          layout: '/src/layouts'
        }
      }

      const dasBaseFolders = getDasBaseFolders(config)
      expect(dasBaseFolders).deep.include({navbasenode: 'foundation/components', basepath: 'node_modules/some/folder'})
      expect(dasBaseFolders).deep.include({navbasenode: 'custom/components', basepath: 'src/components'})
    })
  })
  describe('findAndReadDasFiles', () => {
    it('returns all das-json files as json and file information relative to basefolder', async () => {
      const basepath = './test/dasfiles_test_folder'
      const navbasenode = 'base'
      const dasfiles = await findAndReadDasFiles({basepath, navbasenode})
      const das = {some: 'value'}
      expect(dasfiles).to.deep.include({das, basepath, navbasenode, filename: 'f1.das.json', relativepath: ''})
      expect(dasfiles).to.deep.include({das, basepath, navbasenode, filename: 'f2.das.json', relativepath: 'subfolder'})
      expect(dasfiles).to.deep.include({das, basepath, navbasenode, filename: 'f3.das.json', relativepath: 'anotherfolder'})
      expect(dasfiles).to.deep.include({das, basepath, navbasenode, filename: 'f4.das.json', relativepath: 'anotherfolder'})
      expect(dasfiles).to.deep.include({das, basepath, navbasenode, filename: 'f5.das.json', relativepath: 'anotherfolder/deepfolder'})
      expect(dasfiles.length).equals(5)
    })
  })

  describe('generateImportStmt', () => {
    it('generates import stmt for component description relative to targetproject/dev folder. i.e. prepend ../ to file', () => {
      const description = createSampleComponentDescription()
      const expectedImportStmt = 'import BaseNodeNestedFolderSample from \'../base/path/nested/folder/Sample.svelte\''
      expect(createImportStmt(description)).equals(expectedImportStmt)
    })
    it('generates import stmt for component description relative to target node_module project/dev folder. i.e. removes node_modules/ from file', () => {
      const description = createSampleComponentDescription({basepath: 'node_modules/base/path'})
      const expectedImportStmt = 'import BaseNodeNestedFolderSample from \'base/path/nested/folder/Sample.svelte\''
      expect(createImportStmt(description)).equals(expectedImportStmt)
    })
  })
  describe('generateRouteEntry', () => {
    it('generates route entry', () => {
      const description = createSampleComponentDescription()
      const expectedRouteEntry = `'/base/node/nested/folder/sample': ${JSON.stringify(description, null, 2)}`
      expect(createRouteEntry(description)).deep.equals(expectedRouteEntry)
    })
  })
  describe('generateNavigationEntry', () => {
    it('generates navigation entry', () => {
      const description = createSampleComponentDescription()
      const expectedNavigationEntry = {href: description.route, text: description.das.name, key: description.fullname}
      expect(createNavigationEntry(description)).deep.equals(expectedNavigationEntry)
    })
    it('generates navitem tree', () => {
      const cd1 = createSampleComponentDescription({navbasenode: 'basea', basepath: 'some/folder', relativepath: 'foo', name: 'comp1'})
      const cd2 = createSampleComponentDescription({navbasenode: 'basea', basepath: 'some/folder', relativepath: 'foo', name: 'comp2'})
      const cd3 = createSampleComponentDescription({navbasenode: 'basea', basepath: '/other/folder', relativepath: 'bar', name: 'comp3'})
      const cd4 = createSampleComponentDescription({navbasenode: 'baseb', basepath: 'some/other/folder', relativepath: 'foo', name: 'comp4'})

      const expectedNavItemTree = { 'basea': { 'foo': { '_items': [ { 'href': '/basea/foo/comp1', 'text': 'comp1', 'key': 'BaseaFooComp1' },  { 'href': '/basea/foo/comp2', 'text': 'comp2', 'key': 'BaseaFooComp2' } ] }, 'bar': { '_items': [ { 'href': '/basea/bar/comp3', 'text': 'comp3', 'key': 'BaseaBarComp3' } ] } }, 'baseb': { 'foo': { '_items': [ { 'href': '/baseb/foo/comp4', 'text': 'comp4', 'key': 'BasebFooComp4' } ] } } }

      const navitemtree = createNavItemTree([cd1, cd2, cd3, cd4])

      expect(navitemtree).deep.equals(expectedNavItemTree)
    })
  })
  describe.skip('TODO generateDynamicImportStmt', () => {
    it('generates import stmt', () => {
    })
  })
  describe('generateComponentDescription', () => {
    it('generates component description from das file and given path and basefolder', () => {
      const das = createSampleDas()
      const navbasenode = 'base/node'
      const relativepath = 'nested/folder'
      const basepath = 'base/path'
      const fullpath = 'base/path/nested/folder'

      const expectedFullname = 'BaseNodeNestedFolderSample'
      const expectedRoute = '/base/node/nested/folder/sample'
      const expectedFile = '../base/path/nested/folder/Sample.svelte'
      const expectedFullNavNode = 'base/node/nested/folder'
      const expectedDescription = {das, navbasenode, fullnavnode: expectedFullNavNode, basepath, fullpath, relativepath, file: expectedFile, fullname: expectedFullname, route: expectedRoute} 

      const componentDescription = createComponentDescription({das, navbasenode, basepath, relativepath})

      expect(componentDescription).deep.equals(expectedDescription)
    })
  })
})

function createSampleComponentDescription({name, navbasenode = 'base/node', basepath = 'base/path', relativepath = 'nested/folder'} = {}) {
  const das = createSampleDas(name) 
  return createComponentDescription({das, navbasenode, basepath, relativepath})
}

function createSampleDas(name = 'Sample') {
  return {
    name,
    file: 'Sample.svelte',
    description: 'a description',
    in: [{name: 'inParam', type: 'text'}],
    out: [{name: 'outParam', type: 'text'}],
    examples: [
      {story: 'exampleOne', input: {inParam: 'some text'}}
    ]
  }
}

function getExpectedCode1() {
  return `
import BaseNodeNestedFolderC1 from '../base/path/nested/folder/Sample.svelte'
import BaseNodeNestedFolderC2 from '../base/path/nested/folder/Sample.svelte'

export const routes = {
  '/base/node/nested/folder/c1': {
  "das": {
    "name": "C1",
    "file": "Sample.svelte",
    "description": "a description",
    "in": [
      {
        "name": "inParam",
        "type": "text"
      }
    ],
    "out": [
      {
        "name": "outParam",
        "type": "text"
      }
    ],
    "examples": [
      {
        "story": "exampleOne",
        "input": {
          "inParam": "some text"
        }
      }
    ]
  },
  "basepath": "base/path",
  "navbasenode": "base/node",
  "fullnavnode": "base/node/nested/folder",
  "relativepath": "nested/folder",
  "fullpath": "base/path/nested/folder",
  "file": "../base/path/nested/folder/Sample.svelte",
  "fullname": "BaseNodeNestedFolderC1",
  "route": "/base/node/nested/folder/c1"
},
'/base/node/nested/folder/c2': {
  "das": {
    "name": "C2",
    "file": "Sample.svelte",
    "description": "a description",
    "in": [
      {
        "name": "inParam",
        "type": "text"
      }
    ],
    "out": [
      {
        "name": "outParam",
        "type": "text"
      }
    ],
    "examples": [
      {
        "story": "exampleOne",
        "input": {
          "inParam": "some text"
        }
      }
    ]
  },
  "basepath": "base/path",
  "navbasenode": "base/node",
  "fullnavnode": "base/node/nested/folder",
  "relativepath": "nested/folder",
  "fullpath": "base/path/nested/folder",
  "file": "../base/path/nested/folder/Sample.svelte",
  "fullname": "BaseNodeNestedFolderC2",
  "route": "/base/node/nested/folder/c2"
}
}

export const navtree = {
  "base": {
    "node": {
      "nested": {
        "folder": {
          "_items": [
            {
              "href": "/base/node/nested/folder/c1",
              "text": "C1",
              "key": "BaseNodeNestedFolderC1"
            },
            {
              "href": "/base/node/nested/folder/c2",
              "text": "C2",
              "key": "BaseNodeNestedFolderC2"
            }
          ]
        }
      }
    }
  }
}

export const componentmap = {
  'BaseNodeNestedFolderC1': BaseNodeNestedFolderC1,
'BaseNodeNestedFolderC2': BaseNodeNestedFolderC2
}

export const dynamicImport = {
  Sidenav: () => import ('componentlib/src/components/sidenav/SidenavExample.svelte')
}
`
}
