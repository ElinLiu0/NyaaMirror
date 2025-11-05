import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api': {
    //     // target: 'https://nyaa.si/?q=',
    //     target: 'https://elin-nyaa-mirror-c9d4ffbeacdxc2bm.eastasia-01.azurewebsites.net',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
    host: '0.0.0.0',
    port: 3000,
  },
})
