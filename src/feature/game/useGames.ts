import { useLocalStorage } from "../persistence/useLocalStorage"
import { LS_KEY_GAMES } from "../persistence/localStorageKeys"

export type Game = {
  id: string
  name: string
  createdAt: string
}

export function useGames() {
  const [games, setGames] = useLocalStorage<Game[]>(LS_KEY_GAMES, [])
  return { games, setGames }
}
