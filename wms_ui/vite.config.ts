import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths()
  ],
  server: {
    host: '0.0.0.0',
    // port: 3000,
    port: 3001,
    proxy: {
      "/api": {
        // target: "http://10.0.64.108:8088",
        target: "http://0.0.0.0:8088",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/")
      }
    }
  }
});