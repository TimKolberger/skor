import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import tsconfigPaths from "vite-tsconfig-paths"

const pwaPlugin = VitePWA({
  registerType: "autoUpdate",
  manifest: {
    name: "SKOR",
    short_name: "SKOR",
    start_url: ".",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#0a91b1",
    background_color: "#0a91b1",
    display: "standalone",
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pwaPlugin, tsconfigPaths()],
  test: {
    setupFiles: "test/setup-test.ts",
    coverage: {
      provider: "v8",
      all: true,
      reporter: ["lcov", "text"],
      include: ["src/**"],
      exclude: ["src/App.tsx", "src/main.tsx", "**/*.d.ts"],
    },
    globals: true,
    environment: "jsdom",
    css: false,
  },
})
