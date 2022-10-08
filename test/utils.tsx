import { ChakraProvider, theme } from "@chakra-ui/react"
import { render, RenderOptions } from "@testing-library/react"
import * as React from "react"
import { MemoryRouter, MemoryRouterProps } from "react-router-dom"

import { GameProvider } from "../src/feature/game/GameProvider"
import { PlayerProvider } from "../src/feature/players/PlayerProvider"

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    initialEntries?: MemoryRouterProps["initialEntries"]
  }
) => {
  const AllTheProviders: React.FC<{
    children: React.ReactNode
  }> = ({ children }) => {
    return (
      <ChakraProvider theme={theme}>
        <React.Suspense>
          <PlayerProvider>
            <GameProvider>
              <MemoryRouter initialEntries={options?.initialEntries}>
                {children}
              </MemoryRouter>
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
