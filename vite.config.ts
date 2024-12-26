import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const conditionalPlugins: [string, Record<string, any>][] = [];

if (process.env.TEMPO) {
  conditionalPlugins.push(['tempo-devtools/swc', {}]);
}

export default defineConfig({
  plugins: [
    react({
      plugins: conditionalPlugins
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
});