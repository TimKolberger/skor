import { ChakraProvider } from "@chakra-ui/react"
import * as React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { AppErrorBoundary } from "./feature/error-boundary/AppErrorBoundary"
import { GameProvider } from "./feature/game/GameProvider"
import { routes } from "./feature/navigation/routes"
import { PlayerProvider } from "./feature/players/PlayerProvider"
import { theme } from "./theme"

const router = createBrowserRouter(routes)

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppErrorBoundary>
      <React.Suspense>
        <PlayerProvider>
          <GameProvider>
            <RouterProvider router={router} />
          </GameProvider>
        </PlayerProvider>
      </React.Suspense>
    </AppErrorBoundary>
  </ChakraProvider>
)
