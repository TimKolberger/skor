import { useInterpret } from "@xstate/react"
import * as React from "react"
import { InterpreterFrom } from "xstate"

import { LS_KEY_PLAYERS } from "../persistence/localStorageKeys"
import { useLocalStorage } from "../persistence/useLocalStorage"
import { Player, playerMachine } from "./playerMachine"

export const PlayerServiceContext = React.createContext(
  {} as InterpreterFrom<typeof playerMachine>
)

export interface PlayerProviderProps {
  children: React.ReactNode
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [players, persistPlayers] = usePersistedPlayers()
  const playerService = useInterpret(playerMachine, {
    context: {
      players,
    },
  })

  React.useEffect(() => {
    const sub = playerService.subscribe((state) => {
      persistPlayers(state.context.players)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [playerService, persistPlayers])

  return (
    <PlayerServiceContext.Provider value={playerService}>
      {children}
    </PlayerServiceContext.Provider>
  )
}

function usePersistedPlayers() {
  return useLocalStorage<Player[]>(LS_KEY_PLAYERS, [])
}
