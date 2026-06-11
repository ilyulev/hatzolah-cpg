import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [tailwindcss(), react()],
  // The production build (and `vite preview`, which serves that build) keep the
  // GitHub Pages sub-path so asset URLs resolve; the plain dev server serves at
  // root '/' so the in-IDE preview (which points at the server root) renders.
  base: command === 'build' || isPreview ? '/hatzolah-cpg/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  },
  // Both servers honour an assigned PORT (e.g. the preview harness auto-picking a
  // free port); they fall back to Vite's usual defaults for plain pnpm commands.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    open: false
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    open: false
  }
}))