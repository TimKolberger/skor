import { useSelector } from "@xstate/react"

import { usePlayerService } from "./usePlayerService"

export function usePlayers() {
  const playerService = usePlayerService()
  return useSelector(playerService, (emitted) => emitted?.context) ?? {}
}
