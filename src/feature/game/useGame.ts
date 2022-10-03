import { useSelector } from "@xstate/react"

import { useGameService } from "./useGameService"

export function useGame() {
  const gameService = useGameService()
  return useSelector(gameService, (emitted) => emitted?.context) ?? {}
}
