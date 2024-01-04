import * as localStorageKeys from '../src/features/persistence/local-storage-keys'
import '@testing-library/jest-dom'

beforeEach(() => {
  for (const key of Object.values(localStorageKeys)) {
    localStorage.removeItem(key)
  }
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
