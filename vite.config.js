import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/hatzolah-cpg/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  },
  server: {
    // Honour an assigned PORT (e.g. the preview harness) so the dev server can
    // auto-pick a free port; falls back to 3000 for a plain `pnpm dev`.
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    open: false
  }
})