#!/usr/bin/env node

import { init } from '../src/codegenerator/watchcl.js'
import { input, confirm } from '@inquirer/prompts'
import checkbox from '@inquirer/checkbox'
import { createServer } from '../src/server.js'
import fs from 'node:fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const exampleSourceFolder = path.resolve(__dirname, '../examples') + '/'

if (fs.existsSync('./garden.config.js')) {
  initAndCreateServer()
} else {
  runSetupScript()
}

async function initAndCreateServer() {
  await init()
  await createServer()
}

async function runSetupScript() {
  console.clear()
  console.log('Welcome to the garden setup process')
  console.log('')
  separator()
  console.log('')

  const title = await input({ message: 'Enter your project title:' })

  const libraries = await checkbox({
    message: 'UI Library:',
    choices: [
      { name: 'Svelte', value: 'Svelte' },
      { name: 'Vue', value: 'Vue' },
      { name: 'React', value: 'React' },
    ],
  })

  const componentFolder = await input({
    message: 'Enter your component source folder:',
    default: 'src/',
  })

  const shallCreateExample = await confirm({
    message: 'Should garden create an example component?',
  })

  separator()
  console.log('')
  console.log('Creating garden config file...:')
  console.log('')

  createConfigFile({ title, libraries, componentFolder })
  if (shallCreateExample) {
    createExample({ libraries, componentFolder })
  }

  separator()
  console.log('')
  console.log('Done. Edit garden.config.js file according to your needs.')
  console.log('Happy gardening!')
}

function separator() {
  console.log('===================================')
}

function createConfigFile({ title, componentFolder, libraries }) {
  const importStmts = libraries
    .map((lib) => {
      return `import ${lib}RendererBuilder from "gardenjs/${lib.toLowerCase()}"`
    })
    .join('\n')
  const renderer = libraries
    .map((lib) => {
      return `${lib.toLowerCase()}: ${lib}RendererBuilder,`
    })
    .join('\n    ')

  const watchLibFiles = libraries
    .map((lib) => {
      return `".${lib.toLowerCase()}"`
    })
    .join(', ')

  const content = `
${importStmts}

export default {
  // Define the server port:
  serverport: 3010,

  // Stop auto opening Gardenjs on start:
  // "no_open_browser": true,

  // This title is displayed above the navigation:
  project_title: "${title}",

  // Here you can set a path to your own start page.
  // The HTML file may only contain the body part, i.e. without the doctype, head and body tag:
  // "welcome_page": "/src/custom_welcome_page.html",

  // vite config file:
  // vite_config: "./garden.vite.config.js",
  
  // Each entry is output with its subpages in the page tree:
  structure: {
    components: "/${componentFolder}",
  },

  watch: {
    directories: ["./${componentFolder}"],
    include: [${watchLibFiles}, ".das.json", ".scss", ".css", ".less", ".js", ".ts"],
  },

  renderer: {
    ${renderer}
  },

  // Add global style files needed for your project:
  // "additional_style_files": [
  //   'src/assets/scss/main.scss'
  // ],

  // Edit or disable "Themes" depending on whether your app uses themes.
  // According to your requirements, you may also need to adjust the
  // "onThemeChange" function below accordingly.
  // "themes": [
  //   {name: 'default', stageBg: 'white'},
  //   {name: 'dark', stageBg: '#101010'}, // manually set default active theme on start {active: true, name: 'dark', stageBg: '#101010'},
  //   {name: 'light', stageBg: '#eee'}
  // ],
  // "themeHandler": onThemeChange
}

////  Edit or disable the function "onThemeChange" according to your project (see also "themes" above):
//function onThemeChange(theme) {
//  if (theme === 'default') {
//   delete document.body.dataset.theme
//  } else {
//   document.body.dataset.theme = theme
//  }
//}
  `
  fs.writeFileSync('garden.config.js', content)
}

function createExample({ libraries, componentFolder }) {
  for (const library of libraries) {
    console.log('Create example for library', library)
    copyExampleFiles(library.toLowerCase(), componentFolder)
  }
}

function copyExampleFiles(library, componentFolder) {
  fs.mkdirSync(`${componentFolder}/garden_example/`, { recursive: true })
  const files = fs
    .readdirSync(`${exampleSourceFolder}`)
    .filter((filename) => filename.includes(`.${library}`))
  for (const filename of files) {
    fs.copyFileSync(
      `${exampleSourceFolder}/${filename}`,
      `${componentFolder}/garden_example/${filename}`
    )
  }
}
