import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_URL_API, // <--- Lee la variable de .env
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Esto es importante para que ngrok no rechace el host
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Host', new URL(process.env.VITE_URL_API).host);
          });
        }
      }
    }
  }
})


