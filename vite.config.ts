import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint2';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, '.'),
  plugins: [eslint(), react()]
});
