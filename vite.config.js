import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// is served from a subfolder (/lavoieduhoublon/jeudossards/)
export default defineConfig({
    // url: 'https://assos.utc.fr/lavoieduhoublon/jeudossards/',
    base: '/lavoieduhoublon/jeudossards',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
        })
    ],
})
