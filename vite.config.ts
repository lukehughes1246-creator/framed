import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'
          }
        },
      },
    },
    // Inline small assets instead of emitting separate files
    assetsInlineLimit: 4096,
    // Target modern browsers — smaller output, no legacy polyfills
    target: 'es2020',
  },
})
