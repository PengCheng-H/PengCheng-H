import process from 'process';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [react()],
        define: {
            'process.env': process.env,
        },
        server: {
            host: "0.0.0.0",
            port: 3000,
            proxy: {
                "/api": {
                    target: "http://0.0.0.0:8088",
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ""),
                }
            }
        }
    };
});