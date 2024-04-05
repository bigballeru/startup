import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            // Proxy local API and WebSocket requests
            '/api': 'http://localhost:4000',
            '/ws': {
                target: 'ws://localhost:4000',
                ws: true,
            },
            // Proxy requests to Quote Garden API
            '/quote-api': {
                target: 'https://quote-garden.herokuapp.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/quote-api/, '') // Remove the /quote-api prefix before making the request
            },
        },
    },
});
