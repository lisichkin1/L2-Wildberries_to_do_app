import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react({ runtime: 'automatic' }), svgr()],
  base: '/L2-Wildberries_to_do_app/',
});
