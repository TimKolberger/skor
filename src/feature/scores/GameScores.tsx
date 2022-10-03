import { chakra } from "@chakra-ui/react"
import { AnimatePresence, LayoutGroup, Reorder } from "framer-motion"
import * as React from "react"

import { useGame } from "../game/useGame"
import { useGameService } from "../game/useGameService"
import { Player } from "../players/playerMachine"
import { Sort } from "./GameScoresHeader"
import { ConnectedScoreTile } from "./ScoreTile"

const ReorderGroup = chakra(Reorder.Group, {
  baseStyle: {
    listStyleType: "none",
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
  },
})

const ReorderItem = chakra(Reorder.Item, {
  baseStyle: {
    display: "flex",
    flex: "1 0 auto",
  },
})

export interface GameScoresProps {
  sort?: Sort
}

export const GameScores = ({ sort }: GameScoresProps) => {
  const gameService = useGameService()
  const { players, scores } = useGame()

  React.useEffect(
    () => () => {
      gameService.send({ type: "IDLE" })
    },
    []
  )

  const sortedPlayersAndScores = React.useMemo(() => {
    const playersById = players.reduce((previousValue, player) => {
      previousValue[player.id] = player
      return previousValue
    }, {} as Record<Player["id"], Player>)

    return Object.entries(scores)
      .sort(([, { total: a }], [, { total: b }]) =>
        sort === "desc" ? a - b : b - a
      )
      .flatMap(([playerId, scoreSlice]) => {
        const player = playersById[playerId]
        if (!player) {
          return []
        }

        return [
          {
            player,
            scoreSlice,
          },
        ]
      })
  }, [players, scores, sort])

  return (
    <LayoutGroup>
      <ReorderGroup
        axis="y"
        values={sortedPlayersAndScores}
        onReorder={React.useCallback(() => {}, [])}
      >
        <AnimatePresence>
          {sortedPlayersAndScores.map((value) => {
            const { player, scoreSlice } = value
            return (
              <ReorderItem
                key={player.id}
                value={value}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                drag={false}
              >
                <ConnectedScoreTile
                  player={player}
                  scoreSlice={scoreSlice}
                  key={`${player.id}${sort}`}
                />
              </ReorderItem>
            )
          })}
        </AnimatePresence>
      </ReorderGroup>
    </LayoutGroup>
  )
}
