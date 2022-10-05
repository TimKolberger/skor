import { useInterpret } from "@xstate/react"
import * as React from "react"
import { InterpreterFrom } from "xstate"

import { LS_KEY_SCORE, LS_KEY_STEP } from "../persistence/localStorageKeys"
import { useLocalStorage } from "../persistence/useLocalStorage"
import { usePlayers } from "../players/usePlayers"
import { gameMachine } from "./gameMachine"

export const GameServiceContext = React.createContext(
  {} as InterpreterFrom<typeof gameMachine>
)

export interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const { players } = usePlayers()
  const [scores, persistScores] = usePersistedScores()
  const [step, persistStep] = usePersistedStep()
  const gameService = useInterpret(gameMachine, {
    context: {
      players,
      scores,
      step,
      lastActivePlayer: null,
    },
  })

  React.useEffect(() => {
    const sub = gameService.subscribe((state) => {
      persistScores(state.context.scores)
      persistStep(state.context.step)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [gameService, persistScores, persistStep])

  React.useEffect(() => {
    gameService.send({ type: "IDLE" })
    gameService.send({ type: "SET_PLAYERS", players })
  }, [gameService, players])

  React.useEffect(() => {
    gameService.send({ type: "IDLE" })
    gameService.send({ type: "SET_STEP", step })
  }, [gameService, step])

  return (
    <GameServiceContext.Provider value={gameService}>
      {children}
    </GameServiceContext.Provider>
  )
}

function usePersistedScores() {
  return useLocalStorage(LS_KEY_SCORE, {})
}

function usePersistedStep() {
  return useLocalStorage(LS_KEY_STEP, 1)
}
