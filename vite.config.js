import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile()
  ],
  build: {
    cssCodeSplit: false,     // 避免拆分 CSS
    assetsInlineLimit: 1e9,  // 尽量把资源都内联（图片/字体等）
    chunkSizeWarningLimit: 2000
  }
})