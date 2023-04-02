import * as React from "react"

import { RouteObject } from "react-router-dom"
import { linker } from "./linker"

function lazyRoute(fn: () => Promise<{ default: React.ComponentType }>) {
  return async () => ({
    Component: (await fn()).default,
  })
}

export const routes: RouteObject[] = [
  {
    path: linker.home.definition,
    lazy: lazyRoute(() => import("../scores/pages/GameScoresPage")),
  },
  {
    path: linker.playerScore.definition,
    lazy: lazyRoute(() => import("../scores/pages/PlayerScorePage")),
  },
  {
    path: linker.addPlayer.definition,
    lazy: lazyRoute(() => import("../players/pages/AddPlayerPage")),
  },
  {
    path: linker.editPlayer.definition,
    lazy: lazyRoute(() => import("../players/pages/EditPlayerPage")),
  },
  {
    path: linker.setScores.definition,
    lazy: lazyRoute(() => import("../scores/pages/SetAllScoresPage")),
  },
  {
    path: linker.settings.definition,
    lazy: lazyRoute(() => import("../settings/SettingsPage")),
  },
  {
    path: linker.legalNotice.definition,
    lazy: lazyRoute(() => import("../legal-notice/LegalNoticePage")),
  },
  {
    path: "*",
    lazy: lazyRoute(() => import("./pages/NotFoundPage")),
  },
]
