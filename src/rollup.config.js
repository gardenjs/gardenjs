import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import scss from 'rollup-plugin-scss'
import {scss as sveltescss} from 'svelte-preprocess';

import {config} from './config.js'

function addLivereload () {
  return {
    transform ( code, id ) {
      if (id.indexOf('gardenapp.js') > 0) {
        console.log('ADD RELOAD')
      code += `const socket = new WebSocket('ws://localhost:${config.wssocketport}/', 'autoreload')
socket.onmessage = (msg) => {
  if (/reload/.test(msg.data)) {
    setTimeout(() => {
    location.reload(true)
    }, 1)
  }
}`
      }
      return {
        code, 
        map: null 
      };
    }
  };
}

export default [
  {
  input: 'garden/gardenapp.js',
  output: {
    sourcemap: true,
    format: 'es',
    name: 'app',
    dir: 'garden/build/'
  },
  plugins: [
    scss({
      output: 'garden/build/gardenapp.css'
    }),
    svelte({
      preprocess: sveltescss({}),
      // enable run-time checks when not in production
      dev: true,
      hydratable: true,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: css => {
        css.write('customgardenapp.css');
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    addLivereload()
  ]
  },
  {
  input: 'garden/gardenframe.js',
  output: {
    sourcemap: true,
    format: 'es',
    name: 'app',
    dir: 'garden/build/'
  },
  plugins: [
    scss({
      output: 'garden/build/gardenframe.css'
    }),
    svelte({
      preprocess: sveltescss({}),
      // enable run-time checks when not in production
      dev: true,
      hydratable: true,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: css => {
        css.write('customgardenframe.css');
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
  ]
  },
];

