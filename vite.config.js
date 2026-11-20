import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// served from https://gonzalo-gigena.github.io/portfolio/
export default defineConfig({ plugins: [react()], base: '/portfolio/' })
