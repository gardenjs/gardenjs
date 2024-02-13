#!/usr/bin/env node

import { init } from '../src/codegenerator/watchcl.js'
import { input, confirm } from '@inquirer/prompts'
import checkbox from '@inquirer/checkbox'
import select from '@inquirer/select'
import { createServer } from '../src/server.js'
import fs from 'node:fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const exampleSourceFolder = path.resolve(__dirname, '../examples') + '/'
const execAsync = promisify(exec)

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
  if (libraries.length > 0) {
    console.log(
      'For rendering the components for the selected libraries, you have to install the appropriate plugins.'
    )
    const shallInstallPlugins = await confirm({
      message: 'Shall gardenjs install the necessary plugins?',
    })
    if (!shallInstallPlugins) {
      console.log('If not yet installed, run the following commands')
      for (const library of libraries) {
        console.log('')
        console.log(
          `npm install @gardenjs/render-plugin-${library.toLowerCase()}`
        )
      }
    } else {
      const packman = await select({
        message: 'UI Library:',
        choices: [
          { name: 'npm', value: 'npm', checked: true },
          { name: 'pnpm', value: 'pnpm' },
          { name: 'yarn', value: 'yarn' },
        ],
      })
      packman && (await installPlugins(packman, libraries))
    }
    if (libraries.some((library) => library === 'React')) {
      console.log('')
      console.log(
        'For using gardenjs with react, we have to tell vite to optimize the dependencies.'
      )
      console.log('Please add the following code to your vite config.')
      console.log('')
      console.log('...')
      console.log('optimizeDeps: {')
      console.log('  include: ["react-dom/client"],')
      console.log('},')
      console.log('...')
      console.log('')
    }
  }
  separator()

  console.log('')
  console.log('Done. Edit garden.config.js file according to your needs.')
  console.log('Run npm run garden again, to start gardenjs.')
  separator()
  console.log('Happy gardening!')
  separator()
}

function separator() {
  console.log('===================================')
}

async function installPlugins(packman, libraries) {
  const cmdStart = {
    npm: 'npm install --save-dev ',
    pnpm: 'pnpm install --save-dev ',
    yarn: 'yarn add -D ',
  }[packman]
  const cmd =
    cmdStart +
    libraries
      .map((library) => {
        return `@gardenjs/render-plugin-${library.toLowerCase()}`
      })
      .join(' ')
  await runCommand(cmd)
}

async function runCommand(cmd) {
  try {
    console.log('Run:', cmd)
    const { stdout, stderr } = await execAsync(cmd)

    if (stderr) {
      console.error(`Fehlerausgabe des Befehls: ${stderr}`)
      return
    }

    console.log(`\n${stdout}`)
  } catch (error) {
    console.error(`Fehler beim Ausführen des Befehls: ${error.message}`)
  }
}

const lib2FileExtension = {
  React: '"[tj]sx"',
  Svelte: '"svelte"',
  Vue: '"vue"',
}

function createConfigFile({ title, componentFolder, libraries }) {
  const importStmts = libraries
    .map((lib) => {
      return `import ${lib}RendererBuilder from "@gardenjs/render-plugin-${lib.toLowerCase()}"`
    })
    .join('\n')
  const renderer = libraries
    .map((lib) => {
      return `${lib2FileExtension[lib]}: ${lib}RendererBuilder,`
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
