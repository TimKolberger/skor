import * as React from "react"
import { useState } from "react"

import { AppLayout } from "../../layouts/AppLayout"
import { Main } from "../../layouts/Main"
import { usePlayerService } from "../players/usePlayerService"
import { GameScores } from "./GameScores"
import { GameScoresHeader, Sort } from "./GameScoresHeader"

export default function GameScoresPage() {
  const [sort, setSort] = useState<Sort>("asc")
  const playerService = usePlayerService()
  return (
    <AppLayout>
      <GameScoresHeader
        sort={sort}
        onSort={setSort}
        onDeleteAllPlayers={() => playerService.send({ type: "CLEAR_PLAYERS" })}
      />
      <Main px="0">
        <GameScores sort={sort} />
      </Main>
    </AppLayout>
  )
}
