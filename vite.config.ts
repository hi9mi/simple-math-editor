import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          mathlive: ['mathlive'],
          'better-react-mathjax': ['better-react-mathjax'],
          'react-dom': ['react-dom'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@math-editor': path.resolve(__dirname, 'src'),
    },
  },
  base: '/simple-math-editor/',
  plugins: [react()],
  server: {
    open: true,
  },
});
