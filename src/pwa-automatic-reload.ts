import { registerSW } from 'virtual:pwa-register'

const MINUTE_IN_MS = 60_000
const REFRESH_INTERVAL_IN_MS = 20 * MINUTE_IN_MS

registerSW({
  immediate: true,
  onRegisteredSW: (_, registration) => {
    setInterval(async () => {
      await registration?.update()
    }, REFRESH_INTERVAL_IN_MS)
  },
})
