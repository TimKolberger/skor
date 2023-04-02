import { AppLayout } from "../../../layouts/AppLayout"
import { Main } from "../../../layouts/Main"
import { usePlayerService } from "../../players/usePlayerService"
import { GameScores } from "../GameScores"
import { GameScoresHeader } from "../GameScoresHeader"
import { useGameService } from "../../game/useGameService"

export default function GameScoresPage() {
  const playerService = usePlayerService()
  const gameService = useGameService()

  return (
    <AppLayout>
      <GameScoresHeader
        onDeleteAllPlayers={() => playerService.send({ type: "CLEAR_PLAYERS" })}
        onResetScores={() => {
          gameService.send({ type: "IDLE" })
          gameService.send({ type: "RESET_SCORES" })
        }}
      />
      <Main px="0">
        <GameScores />
      </Main>
    </AppLayout>
  )
}
