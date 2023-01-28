import { createElement, lazy } from "react"

import { linker } from "./linker"

export const routes = [
  {
    path: linker.home.definition,
    element: createElement(
      lazy(() => import("../scores/pages/GameScoresPage"))
    ),
  },
  {
    path: linker.gamesOverview.definition,
    element: createElement(
      lazy(() => import("../game/pages/GamesOverviewPage"))
    ),
  },
  {
    path: linker.playerScore.definition,
    element: createElement(
      lazy(() => import("../scores/pages/PlayerScorePage"))
    ),
  },
  {
    path: linker.addPlayer.definition,
    element: createElement(
      lazy(() => import("../players/pages/AddPlayerPage"))
    ),
  },
  {
    path: linker.editPlayer.definition,
    element: createElement(
      lazy(() => import("../players/pages/EditPlayerPage"))
    ),
  },
  {
    path: linker.setScores.definition,
    element: createElement(
      lazy(() => import("../scores/pages/SetAllScoresPage"))
    ),
  },
  {
    path: linker.settings.definition,
    element: createElement(lazy(() => import("../settings/SettingsPage"))),
  },
  {
    path: linker.legalNotice.definition,
    element: createElement(
      lazy(() => import("../legal-notice/LegalNoticePage"))
    ),
  },
  { element: createElement(lazy(() => import("./pages/NotFoundPage"))) },
]
