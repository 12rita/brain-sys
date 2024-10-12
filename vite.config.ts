import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@vars': path.resolve(__dirname, 'src/assets/vars'),
      // '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
})
