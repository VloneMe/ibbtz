import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Gala registration + admin dashboard API (server/ in this repo)
      '/api/gala': { target: 'http://localhost:5091', changeOrigin: true },
      '/api/admin': { target: 'http://localhost:5091', changeOrigin: true },
      '/api/health': { target: 'http://localhost:5091', changeOrigin: true },
      // Proxy API requests to local backend
      '/api': {
        target: 'http://localhost:5500/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Proxy media requests to local backend API
      '/media': {
        target: 'http://localhost:5500/api/v1',
        changeOrigin: true,
      },
      // Proxy uploads (images) - these are served from root, not /api/v1
      '/uploads': {
        target: 'http://localhost:5500',
        changeOrigin: true,
        secure: false,
      },
      // Proxy events endpoint
      '/events': {
        target: 'http://localhost:5500/api/v1',
        changeOrigin: true,
      },
    },
    port: 5046,
  },
})
