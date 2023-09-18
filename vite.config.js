import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      makeAbsoluteExternalsRelative: false,
      external: [
        '../base.js',
        '../das_import_map.js',
        '../../garden.config.js',
      ],
    },
  },
})
