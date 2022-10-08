import { ScoreSlice, SortType } from "../game/gameMachine"
import { Player } from "../players/playerMachine"

export function sortPlayersWithScore({
  players,
  scores,
  sort,
}: {
  players: Player[]
  scores: Record<Player["id"], ScoreSlice>
  sort: SortType
}) {
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
}
