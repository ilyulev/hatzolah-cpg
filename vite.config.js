import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [tailwindcss(), react()],
  // Production build keeps the GitHub Pages sub-path; the dev server serves at
  // root '/' so the in-IDE preview (which points at the server root) renders.
  base: command === 'build' ? '/hatzolah-cpg/' : '/',
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
}))