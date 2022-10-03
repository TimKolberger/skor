import { LS_KEY_MUTED } from "../persistence/localStorageKeys"
import { useLocalStorage } from "../persistence/useLocalStorage"

export function useMuted() {
  return useLocalStorage(LS_KEY_MUTED, false)
}
