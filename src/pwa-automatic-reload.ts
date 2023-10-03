import { registerSW } from "virtual:pwa-register"

const REFRESH_INTERVAL_IN_MS = 20 * 60 * 1000

registerSW({
  immediate: true,
  onRegisteredSW: (_, registration) => {
    setInterval(() => {
      registration?.update()
    }, REFRESH_INTERVAL_IN_MS)
  },
})
