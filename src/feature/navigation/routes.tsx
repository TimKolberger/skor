import React, { createElement, lazy } from "react"

import { linker } from "./linker"
import { createBrowserRouter, Outlet } from "react-router-dom"
import { GameProvider } from "../game/GameProvider"

export const router = createBrowserRouter([
  {
    path: linker.games.definition,
    children: [
      {
        path: "",
        element: createElement(lazy(() => import("../game/pages/GamesPage"))),
      },
      {
        path: linker.addGame.asChildDefinition(linker.games.definition),
        element: createElement(
          lazy(() => import("../game/pages/CreateGamePage"))
        ),
      },
      {
        path: linker.joinGame.asChildDefinition(linker.games.definition),
        element: createElement(
          lazy(() => import("../game/pages/JoinGamePage"))
        ),
      },
      {
        path: linker.game.asChildDefinition(linker.games.definition),
        element: createElement(() => (
          <GameProvider>
            <Outlet />
          </GameProvider>
        )),
        children: [
          {
            path: "",
            element: createElement(
              lazy(() => import("../game/pages/GamePage"))
            ),
          },
          {
            path: linker.shareGame.asChildDefinition(linker.game.definition),
            element: createElement(
              lazy(() => import("../game/pages/ShareGamePage"))
            ),
          },

          {
            path: linker.player.asChildDefinition(linker.game.definition),
            element: createElement(
              lazy(() => import("../scores/pages/PlayerScorePage"))
            ),
          },
          {
            path: linker.addPlayer.asChildDefinition(linker.game.definition),
            element: createElement(
              lazy(() => import("../players/pages/AddPlayerPage"))
            ),
          },
          {
            path: linker.editPlayer.asChildDefinition(linker.game.definition),
            element: createElement(
              lazy(() => import("../players/pages/EditPlayerPage"))
            ),
          },
          {
            path: linker.setScores.asChildDefinition(linker.game.definition),
            element: createElement(
              lazy(() => import("../scores/pages/SetAllScoresPage"))
            ),
          },
        ],
      },
    ],
  },
  {
    path: linker.home.definition,
    element: createElement(lazy(() => import("../game/pages/GamesPage"))),
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
])
