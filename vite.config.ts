import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Set base to your repo name for GitHub Pages
  // Example: if your repo is 'my-portfolio', use base: '/my-portfolio/'
  // For root domain deployment, use base: '/'
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
