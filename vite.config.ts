import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath,URL} from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\@\//,
        replacement: fileURLToPath(new URL('./src/',import.meta.url))
      }
    ],
  },
})
