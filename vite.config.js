import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base makes the build work on GitHub Pages project URLs.
  base: './',
  plugins: [react()],
  css: {
    postcss: {}
  }
});
