import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/L2-Wildberries_to_do_app/',
});
