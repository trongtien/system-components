import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true
      }
    })
  ],
  css: {
    postcss: {
      plugins: []
    }
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "umd"],
      name: "system-component",
      fileName: (format) => `system-component.${format}.js`
    }
  }
})
