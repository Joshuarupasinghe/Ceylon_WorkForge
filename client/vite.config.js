import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy any request starting with /api to your backend
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      // Proxy any request starting with /uploads to your backend
      '/uploads': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, '/uploads')
      }
    }
  },
  resolve: {
    alias: {
      // Optional: make /uploads in code map to the public folder if needed
      '@uploads': path.resolve(__dirname, 'uploads')
    }
  }
})
