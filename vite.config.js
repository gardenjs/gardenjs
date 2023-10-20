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
        'garden',
        '/raw_component_import_map.js',
        '../base.js',
        '../das_import_map.js',
        '../component_import_map.js',
        '../../garden.config.js',
        '../Hellogarden.svelte',
        '/renderer/SvelteRenderer.svelte',
        '/renderer/VueRenderer.vue',
        '/renderer/state.js',
        'vue',
      ],
    },
  },
})
