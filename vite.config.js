import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: ['index.html', 'frame.html'],
      makeAbsoluteExternalsRelative: false,
      external: [
        '../raw_component_import_map.js',
        '../base.js',
        '../das_import_map.js',
        '../component_import_map.js',
        '../../garden.config.js',
        '../gardenframe/cssimport.js',
        '../renderer/SvelteRenderer.svelte',
      ],
    },
  },
})
