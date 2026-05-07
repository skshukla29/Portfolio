import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('gsap')) {
            return 'gsap';
          }

          if (id.includes('framer-motion')) {
            return 'motion';
          }

          if (id.includes('three') || id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'three';
          }

          if (id.includes('react-router-dom')) {
            return 'router';
          }

          return 'vendor';
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
