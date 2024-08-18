import * as localStorageKeys from '../src/features/persistence/local-storage-keys'
import * as sessionStorageKeys from '../src/features/persistence/session-storage-keys'
import { useLastDiff } from '../src/features/rooms/score/use-last-diff'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  for (const key of Object.values(localStorageKeys)) {
    localStorage.removeItem(key)
  }
  for (const key of Object.values(sessionStorageKeys)) {
    sessionStorage.removeItem(key)
  }
  useLastDiff.setState({ diff: 1 })
})

// mock prototype functions for audio elements
window.HTMLMediaElement.prototype.load = vi.fn()
window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.PointerEvent = class PointerEvent extends Event {} as any
window.HTMLElement.prototype.scrollIntoView = vi.fn()
window.HTMLElement.prototype.hasPointerCapture = vi.fn()
window.HTMLElement.prototype.setPointerCapture = vi.fn()
window.HTMLElement.prototype.releasePointerCapture = vi.fn()
