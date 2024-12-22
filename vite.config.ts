import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(process.cwd()),
      '@': `${path.resolve(process.cwd())}/src`,
    },
  },
  server: {
    proxy: {
      '/supabase': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supabase/, ''),
      },
    },
  },
});
