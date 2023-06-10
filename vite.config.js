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
            includeAssets: ['logoVdh.webp'],
            manifest: {
                name: 'La voie du houblon',
                short_name: 'VDH',
                description: 'Application pour le jeu de la voie du houblon',
                theme_color: '#283618',
                icons: [
                    {
                        src: 'logoVdh_192.webp',
                        sizes: '192x192',
                        type: 'image/webp'
                    },
                    {
                        src: 'logoVdh_512.webp',
                        sizes: '512x512',
                        type: 'image/webp'
                    }
                ]
            }
        })
    ],
})
