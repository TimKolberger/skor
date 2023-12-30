import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const pwaPlugin = VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'SKOR',
    short_name: 'SKOR',
    start_url: '/',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#0a91b1',
    background_color: '#0a91b1',
    display: 'standalone',
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}']
  }
})

const optionalPlugins = (['1', 'true'].includes(
  process.env.ANALYZE?.toLowerCase(),
)
  ? [
      visualizer({
        template: 'treemap', // or sunburst
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ]
  : []) as unknown as PluginOption[]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pwaPlugin, ...optionalPlugins],
  server: {},
  test: {
    setupFiles: 'test/setup-test.ts',
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['src/App.tsx', 'src/main.tsx', '**/*.d.ts'],
    },
    globals: true,
    environment: 'happy-dom',
    css: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          collaboration: ['yjs', 'y-webrtc', 'y-indexeddb'],
        },
      },
    },
  },
})
