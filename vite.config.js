import { defineConfig } from "vite";
import { resolve } from "path";
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
    }
  },
  plugins: [
    react(),
    legacy(),
  ],
  define: {
    global: 'globalThis',
  },
});