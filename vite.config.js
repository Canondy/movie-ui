import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
// 这个Vue3项目创建时引入的
// export default defineConfig({
//   plugins: [vue()]
// })

// 使用Vant组件时引入的
export default {
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
};