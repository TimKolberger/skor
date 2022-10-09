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
  return players
    .sort((playerA, playerB) => {
      const scoreA = scores[playerA.id]?.total ?? 0
      const scoreB = scores[playerB.id]?.total ?? 0
      return sort === "desc" ? scoreA - scoreB : scoreB - scoreA
    })
    .map((player) => ({
      player,
      scoreSlice: scores[player.id],
    }))
}
