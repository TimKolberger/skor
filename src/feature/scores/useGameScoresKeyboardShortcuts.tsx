import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { useGame } from "../game/useGame"
import { useGameService } from "../game/useGameService"
import { linker } from "../navigation/linker"
import { sortPlayersWithScore } from "./sortPlayersWithScore"

export function useGameScoresKeyboardShortcuts() {
  const gameService = useGameService()
  const { sort, scores, players } = useGame()
  const navigate = useNavigate()

  function createHotkeyHandler(index: number, type: "INCREMENT" | "DECREMENT") {
    return () => {
      const sortedPlayers = sortPlayersWithScore({
        players,
        scores,
        sort,
      })

      const playerScoreSlice = sortedPlayers[index]
      if (!playerScoreSlice) {
        return
      }
      gameService.send({ type, playerId: playerScoreSlice.player.id })
    }
  }

  const handlerDeps = [sort, scores, players]

  useHotkeys("1", createHotkeyHandler(0, "INCREMENT"), handlerDeps)
  useHotkeys("2", createHotkeyHandler(1, "INCREMENT"), handlerDeps)
  useHotkeys("3", createHotkeyHandler(2, "INCREMENT"), handlerDeps)
  useHotkeys("4", createHotkeyHandler(3, "INCREMENT"), handlerDeps)
  useHotkeys("5", createHotkeyHandler(4, "INCREMENT"), handlerDeps)
  useHotkeys("6", createHotkeyHandler(5, "INCREMENT"), handlerDeps)
  useHotkeys("7", createHotkeyHandler(6, "INCREMENT"), handlerDeps)
  useHotkeys("8", createHotkeyHandler(7, "INCREMENT"), handlerDeps)
  useHotkeys("9", createHotkeyHandler(8, "INCREMENT"), handlerDeps)
  useHotkeys("0", createHotkeyHandler(9, "INCREMENT"), handlerDeps)

  useHotkeys("shift+1", createHotkeyHandler(0, "DECREMENT"), handlerDeps)
  useHotkeys("shift+2", createHotkeyHandler(1, "DECREMENT"), handlerDeps)
  useHotkeys("shift+3", createHotkeyHandler(2, "DECREMENT"), handlerDeps)
  useHotkeys("shift+4", createHotkeyHandler(3, "DECREMENT"), handlerDeps)
  useHotkeys("shift+5", createHotkeyHandler(4, "DECREMENT"), handlerDeps)
  useHotkeys("shift+6", createHotkeyHandler(5, "DECREMENT"), handlerDeps)
  useHotkeys("shift+7", createHotkeyHandler(6, "DECREMENT"), handlerDeps)
  useHotkeys("shift+8", createHotkeyHandler(7, "DECREMENT"), handlerDeps)
  useHotkeys("shift+9", createHotkeyHandler(8, "DECREMENT"), handlerDeps)
  useHotkeys("shift+0", createHotkeyHandler(9, "DECREMENT"), handlerDeps)

  useHotkeys("a", () => {
    navigate(linker.addPlayer())
  })

  useHotkeys("s", () => {
    gameService.send({
      type: "TOGGLE_SORT",
    })
  })
}
