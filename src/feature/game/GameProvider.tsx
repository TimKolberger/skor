import { useInterpret } from "@xstate/react"
import * as React from "react"
import { useEffect, useState } from "react"
import { AnyEventObject, InterpreterFrom } from "xstate"
import { usePlayers } from "../players/usePlayers"
import { GameEvent, gameMachine } from "./gameMachine"
import {
  DocumentProvider,
  useArray,
  useMap,
} from "../collaboration/YDocProvider"
import { Game, useGames } from "./useGames"
import { Doc, YArrayEvent } from "yjs"

import { useParams } from "react-router-dom"
import NotFoundPage from "../navigation/pages/NotFoundPage"
import { WebrtcProvider } from "y-webrtc"
import { IndexeddbPersistence } from "y-indexeddb"
import { useLatestRef } from "@chakra-ui/react"
import { AppLayout } from "../../layouts/AppLayout"
import { Header } from "../../layouts/Header"

export const GameServiceContext = React.createContext(
  {} as InterpreterFrom<typeof gameMachine>
)

export interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameDocs, setGameDocs] = useState(
    new Map<
      string,
      {
        doc: Doc
        webrtcProvider: WebrtcProvider
        indexDbProvider: IndexeddbPersistence
      }
    >()
  )
  const [isWebrtcSynced, setWebrtcIsSynced] = useState(false)
  const [isIndexDbSynced, setIndexDbIsSynced] = useState(false)

  const { gameId } = useParams()
  const game = useGames().games.find((game) => game.id === gameId)

  useEffect(() => {
    if (!game) {
      return
    }

    setGameDocs((prevGameDocs) => {
      if (prevGameDocs.has(game.id)) {
        return prevGameDocs
      }
      const nextGameDocs = new Map(prevGameDocs)
      const doc = new Doc()

      const persistenceId = `cardscore:${game.id}`
      const indexDbProvider = new IndexeddbPersistence(persistenceId, doc)
      const webrtcProvider = new WebrtcProvider(persistenceId, doc, {
        signaling: ["wss://signaling.kolberger.eu/"],
      })

      nextGameDocs.set(game.id, { doc, indexDbProvider, webrtcProvider })
      return nextGameDocs
    })
  }, [game])

  const gameDocsRef = useLatestRef(gameDocs)
  useEffect(() => {
    const gameDocs = gameDocsRef.current
    return () => {
      gameDocs.forEach(({ doc, indexDbProvider, webrtcProvider }) => {
        webrtcProvider.disconnect()
        webrtcProvider.destroy()
        indexDbProvider.destroy()
        doc.destroy()
      })
    }
  }, [gameDocsRef])

  const gameDoc = game ? gameDocs.get(game.id) : undefined

  useEffect(() => {
    if (!gameDoc) return

    setWebrtcIsSynced(false)
    setIndexDbIsSynced(false)

    setTimeout(() => {
      setWebrtcIsSynced(true)
      setIndexDbIsSynced(true)
    }, 2000)

    gameDoc.webrtcProvider.on("synced", async () => {
      setWebrtcIsSynced(true)
    })
    gameDoc.indexDbProvider.on("synced", () => {
      setIndexDbIsSynced(true)
    })
  }, [gameDoc])

  if (!game) {
    return <NotFoundPage />
  }

  const isSynced = isWebrtcSynced && isIndexDbSynced
  if (!isSynced) {
    return (
      <AppLayout>
        <Header />
      </AppLayout>
    )
  }

  if (!gameDoc) {
    // initially it is undefined, then it is set to a Doc
    return (
      <AppLayout>
        <Header />
      </AppLayout>
    )
  }

  return (
    <DocumentProvider doc={gameDoc.doc} key={game.id}>
      <InGameProvider game={game}>{children}</InGameProvider>
    </DocumentProvider>
  )
}

export interface InGameProviderProps {
  children: React.ReactNode
  game: Game
}

const InGameProvider = ({ children, game }: InGameProviderProps) => {
  const { state: players } = usePlayers()

  console.log("PLAYERS", JSON.stringify(players, null, 2))

  const yInitialState = useMap("state")
  const yGameEvents = useArray<GameEvent>("gameEvents")
  const gameService = useInterpret(gameMachine, {
    context: {
      id: game.id,
      name: game.name,
      players,
      lastActivePlayer: null,
      ...yInitialState.state,
    },
  })

  console.log("INITIAL STATE", yInitialState)

  const setInitialState = yInitialState.set
  React.useEffect(() => {
    const sub = gameService.subscribe((state) => {
      if (
        state.event.source &&
        ["ignore", "remote"].includes(state.event.source)
      )
        return
      for (const [key, value] of Object.entries(state.context)) {
        console.log("SETTING INITIAL STATE", key, value)
        setInitialState(key, value)
      }
    })
    return () => {
      sub.unsubscribe()
    }
  }, [gameService, setInitialState])

  React.useEffect(
    function emitActions() {
      const onEventListener = (event: AnyEventObject) => {
        if (
          ("source" in event && ["ignore", "remote"].includes(event.source)) ||
          ["xstate.", "IDLE"].some((term) => event.type.startsWith(term))
        ) {
          return
        }
        yGameEvents.push([event as GameEvent])
      }

      gameService.onEvent(onEventListener)
      return () => {
        gameService.off(onEventListener)
      }
    },
    [gameService, yGameEvents]
  )

  React.useEffect(
    function consumeRemoteActions() {
      const observer = (event: YArrayEvent<GameEvent>) => {
        if (event.transaction.local) {
          return
        }
        for (const item of event.changes.added) {
          if (!("arr" in item.content && Array.isArray(item.content.arr)))
            return
          const machineEvents = item.content.arr?.map((item: GameEvent) => ({
            ...item,
            source: "remote" as const,
          }))
          gameService.send(machineEvents)
        }
      }
      yGameEvents.yarray.observe(observer)
      return () => {
        yGameEvents.yarray.unobserve(observer)
      }
    },
    [gameService, yGameEvents.yarray]
  )

  React.useEffect(() => {
    if (players.length === gameService.state.context.players.length) {
      // congrats, you found a hack
      return
    }
    gameService.send({ type: "IDLE", source: "ignore" })
    gameService.send({ type: "SET_PLAYERS", players, source: "ignore" })
  }, [gameService, players])

  return (
    <GameServiceContext.Provider value={gameService}>
      {children}
    </GameServiceContext.Provider>
  )
}
