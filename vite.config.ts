import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.vue', 'src/**/*.ts'],
      staticImport: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
      skipDiagnostics: false,
      logDiagnostics: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueStarfall',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', '@vjsplus-j/galaxy-styles'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        // 保持资源文件名简洁
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue-starfall.css'
          return assetInfo.name || 'assets/[name][extname]'
        }
      }
    },
    cssCodeSplit: false,
    // 清空输出目录
    emptyOutDir: true,
    // 生成 sourcemap
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
