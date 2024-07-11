#!/usr/bin/env node

import checkbox from '@inquirer/checkbox'
import { confirm, input } from '@inquirer/prompts'
import select from '@inquirer/select'
import { exec } from 'node:child_process'
import fs from 'node:fs'
import { promisify } from 'node:util'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from '../src/server.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const exampleSourceFolder = path.resolve(__dirname, '../examples') + '/'
const execAsync = promisify(exec)

if (fs.existsSync('./garden.config.js')) {
  createNodeViteServer()
} else {
  runSetupScript()
}

async function createNodeViteServer() {
  await createServer()
}

async function runSetupScript() {
  console.clear()
  console.log('Welcome to the garden setup process')
  console.log('')
  separator()
  console.log('')

  const title = await input({ message: 'Enter your project title:' })

  let libraries = await checkbox({
    message: 'UI Library:',
    required: true,
    validate: (items) => {
      if (items.length > 1 && items.some((item) => item.value === 'None')) {
        return "'No Library' cannot be used in combination with another value"
      }
      return true
    },
    choices: [
      { name: 'No Library', value: 'None' },
      { name: 'Svelte', value: 'Svelte' },
      { name: 'Vue', value: 'Vue' },
      { name: 'React', value: 'React' },
    ],
  })

  if (libraries.includes('None')) {
    libraries = []
  }

  const componentFolder = await input({
    message: 'Enter your component source folder:',
    default: './src/',
  })

  const shallCreateExample = await confirm({
    message: 'Should garden create an example component?',
  })

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
        message: 'Package manager:',
        choices: [
          { name: 'npm', value: 'npm', checked: true },
          { name: 'pnpm', value: 'pnpm' },
          { name: 'yarn', value: 'yarn' },
        ],
      })
      packman && (await installPlugins(packman, libraries))
    }
  }
  separator()

  const shallCreateViteConfig = await confirm({
    message:
      'You need a vite configuration file for gardenjs. Shall we create the file?',
  })
  if (shallCreateViteConfig) {
    separator()
    console.log('')
    console.log('Creating garden.vite.config.js ...:')
    console.log('')
    createViteConfig(libraries)
  } else {
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
  console.log('Creating garden.config.js ...:')
  console.log('')

  createConfigFile({ title, libraries, componentFolder })

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
    pnpm: 'pnpm add -D ',
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
  // no_open_browser: true,

  // For garden development purposes only !!!
  // If this option is set to true, the "Code" tab is not displayed in the panel. An empty stage is displayed instead of the custom welcome_page.
  // devmodus: true,

  // This title is displayed above the navigation:
  // If the path to a logo is specified, "project_title" is used as the alt tag. Additional darkmode logo can be added.
  project_title: '${title}',
  // project_logo: './src/assets/logo.svg',
  // project_logo_darkmode: './src/assets/logo_neg.svg',

  // Here you can set a path to your own start page.
  // The HTML file may only contain the body part, i.e. without the doctype, head and body tag:
  // welcome_page: './src/custom_welcome_page.html',

  // Show/hide the link to the docs in the sidebar:
  docs_link: true,

  // vite config file:
  vite_config: './garden.vite.config.js',
  
  // Each entry is output with its subpages in the page tree:
  structure: {
    components: '${componentFolder}',
  },

  watch: {
    directories: ['${componentFolder}'],
    include: [${watchLibFiles}, '.scss', '.css', '.less', '.js', '.ts'],
  },

  renderer: {
    ${renderer}
  },

  // Add global style files needed for your project:
  // additional_style_files: [
  //   'src/assets/scss/main.scss'
  // ],

  // Edit or disable "Themes" depending on whether your app uses themes.
  // According to your requirements, you may also need to adjust the
  // "onThemeChange" function below accordingly.
  // themes: [
  //   {name: 'default', stageBg: 'white'},
  //   {name: 'dark', stageBg: '#101010'}, // manually set default active theme on start {active: true, name: 'dark', stageBg: '#101010'},
  //   {name: 'light', stageBg: '#eee'}
  // ],
  // themeHandler: onThemeChange
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

function createViteConfig(libraries) {
  const viteLibs = getViteImports(libraries)
  const optionalPathImport = libraries.includes('Svelte')
    ? 'import { join, resolve } from "node:path";'
    : ''
  const sveltekit_alias = libraries.includes('Svelte')
    ? `
    resolve: {
      alias: [
        {
          find: /\\$app\\/(.*)/,
          replacement: join(resolve(__dirname, "node_modules/@gardenjs/render-plugin-svelte/src/sveltekit_mocks/"), "$1"),
        },
      ],
    },
    `
    : ''

  const optimizeDeps = libraries.includes('React')
    ? `optimizeDeps: {
      include: ["react-dom/client"],
    },
`
    : ''

  const content = `
import { defineConfig } from "vite"
${optionalPathImport}
${viteLibs.importStmts.join('\n')}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [${viteLibs.pluginStmts.join(', ')}],
    root: ".garden",
    assetsInclude: ['**/*.md'],
    publicDir: "../public",
    ${sveltekit_alias}
    ${optimizeDeps}
    build: {
      rollupOptions: {
        input: {
          app: ".garden/index.html",
          frame: ".garden/frame.html",
        },
      },
    },
  };
});
  `
  fs.writeFileSync('garden.vite.config.js', content)
}

const lib2ViteImport = {
  Svelte:
    'import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte"',
  React: 'import react from "@vitejs/plugin-react"',
  Vue: 'import vue from "@vitejs/plugin-vue"',
}

const lib2VitePluginStmt = {
  Svelte: 'svelte({preprocess: vitePreprocess()})',
  React: 'react()',
  Vue: 'vue()',
}

function getViteImports(libraries) {
  return libraries.reduce(
    (acc, cur) => {
      acc.importStmts.push(lib2ViteImport[cur])
      acc.pluginStmts.push(lib2VitePluginStmt[cur])
      return acc
    },
    { importStmts: [], pluginStmts: [] }
  )
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
