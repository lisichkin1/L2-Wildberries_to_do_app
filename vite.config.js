import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
export default defineConfig({
  plugins: [react({ runtime: 'automatic' }), svgr()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // используем path.resolve
        sw: path.resolve(__dirname, 'src/pages/Home/sw.js'), // и здесь
      },
    },
  },
});
