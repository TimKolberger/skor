import { AppLayout } from "../../../layouts/AppLayout"
import { Main } from "../../../layouts/Main"
import { usePlayerService } from "../../players/usePlayerService"
import { GameScores } from "../GameScores"
import { GameScoresHeader } from "../GameScoresHeader"

export default function GameScoresPage() {
  const playerService = usePlayerService()

  return (
    <AppLayout>
      <GameScoresHeader
        onDeleteAllPlayers={() => playerService.send({ type: "CLEAR_PLAYERS" })}
      />
      <Main px="0">
        <GameScores />
      </Main>
    </AppLayout>
  )
}
