import { useArray } from "../collaboration/YDocProvider"

export interface Player {
  id: string
  name: string
  color: string
}

export function usePlayers() {
  return useArray<Player>("players")
}
