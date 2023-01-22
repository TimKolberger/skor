import "@testing-library/jest-dom"

import * as localStorageKeys from "../src/feature/persistence/localStorageKeys"

beforeEach(() => {
  for (const key of Object.values(localStorageKeys)) {
    localStorage.removeItem(key)
  }
})

// mock prototype functions for audio elements
window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.play = async () => {
  /* do nothing */
}
