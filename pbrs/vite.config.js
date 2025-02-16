import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    host: true,
    port: 5173,
    hmr: {
      clientPort: 9011,  // The port exposed to your host machine
      host: 'localhost'
    },
    proxy: {
      '/api': {
        target: 'http://pbrs-api-gateway:5000',
        // target: 'http://localhost:9005',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // configure: (proxy, options) => {
        //   proxy.on('error', (err, req, res) => {
        //     console.log('proxy error', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq, req, res) => {
        //     console.log('sending request to:', proxyReq.path);
        //   });
        // }
      }
    }
  }
})
