import * as React from "react"

import { linker } from "../feature/linker/linker"

const LazyGameScorePage = React.lazy(
  () => import("../feature/scores/GameScorePage")
)
const LazyEditPlayerPage = React.lazy(
  () => import("../feature/players/EditPlayerPage")
)
const LazyAddPlayerPage = React.lazy(
  () => import("../feature/players/AddPlayerPage")
)
const LazyNotFoundPage = React.lazy(
  () => import("../feature/linker/NotFoundPage")
)
const LazySetAllScoresPage = React.lazy(
  () => import("../feature/scores/SetAllScoresPage")
)
const LazyPlayerScorePage = React.lazy(
  () => import("../feature/scores/PlayerScorePage")
)

export const routes = [
  { path: linker.home.definition, element: <LazyGameScorePage /> },
  { path: linker.playerScore.definition, element: <LazyPlayerScorePage /> },
  { path: linker.addPlayer.definition, element: <LazyAddPlayerPage /> },
  { path: linker.editPlayer.definition, element: <LazyEditPlayerPage /> },
  { path: linker.setScores.definition, element: <LazySetAllScoresPage /> },
  { path: linker.settings.definition, element: <LazyNotFoundPage /> },
  { element: <LazyNotFoundPage /> },
]
