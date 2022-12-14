/* istanbul ignore file */
import { ChakraProvider } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import * as React from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

import { GameProvider } from "./feature/game/GameProvider"
import { routes } from "./feature/navigation/routes"
import { PlayerProvider } from "./feature/players/PlayerProvider"
import { theme } from "./theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <React.Suspense>
        <PlayerProvider>
          <GameProvider>
            <AnimatedRoutes />
          </GameProvider>
        </PlayerProvider>
      </React.Suspense>
    </BrowserRouter>
  </ChakraProvider>
)

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </AnimatePresence>
  )
}
