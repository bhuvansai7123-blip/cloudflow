import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds the whole site into one HTML file for quick previews.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist-demo', rollupOptions: { output: { manualChunks: undefined } } },
})
