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
