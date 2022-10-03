import * as React from "react"

import { linker } from "./linker"

const LazyGameScorePage = React.lazy(() => import("../scores/GameScorePage"))
const LazyEditPlayerPage = React.lazy(() => import("../players/EditPlayerPage"))
const LazyAddPlayerPage = React.lazy(() => import("../players/AddPlayerPage"))
const LazyNotFoundPage = React.lazy(() => import("./NotFoundPage"))
const LazySetAllScoresPage = React.lazy(
  () => import("../scores/SetAllScoresPage")
)
const LazyPlayerScorePage = React.lazy(
  () => import("../scores/PlayerScorePage")
)
const LazySettingsPage = React.lazy(() => import("../settings/SettingsPage"))
const LazyLegalNoticePage = React.lazy(
  () => import("../legal-notice/LegalNoticePage")
)

export const routes = [
  { path: linker.home.definition, element: <LazyGameScorePage /> },
  { path: linker.playerScore.definition, element: <LazyPlayerScorePage /> },
  { path: linker.addPlayer.definition, element: <LazyAddPlayerPage /> },
  { path: linker.editPlayer.definition, element: <LazyEditPlayerPage /> },
  { path: linker.setScores.definition, element: <LazySetAllScoresPage /> },
  { path: linker.settings.definition, element: <LazySettingsPage /> },
  { path: linker.legalNotice.definition, element: <LazyLegalNoticePage /> },
  { element: <LazyNotFoundPage /> },
]
