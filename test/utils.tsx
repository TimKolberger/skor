import { ChakraProvider, theme } from "@chakra-ui/react"
import { RenderOptions, render } from "@testing-library/react"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"

import { GameProvider } from "../src/feature/game/GameProvider"
import { PlayerProvider } from "../src/feature/players/PlayerProvider"

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    Router?: React.ElementType
  }
) => {
  const Router = options?.Router ?? MemoryRouter
  const AllTheProviders: React.FC<{
    children: React.ReactNode
  }> = ({ children }) => {
    return (
      <ChakraProvider theme={theme}>
        <React.Suspense>
          <PlayerProvider>
            <GameProvider>
              <Router>{children}</Router>
            </GameProvider>
          </PlayerProvider>
        </React.Suspense>
      </ChakraProvider>
    )
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from "@testing-library/react"
export { customRender as render }
