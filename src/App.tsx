import { ChakraProvider } from "@chakra-ui/react"
import * as React from "react"
import { RouterProvider } from "react-router-dom"

import { AppErrorBoundary } from "./feature/error-boundary/AppErrorBoundary"
import { router } from "./feature/navigation/routes"
import { theme } from "./theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppErrorBoundary>
      <React.Suspense>
        <RouterProvider router={router} />
      </React.Suspense>
    </AppErrorBoundary>
  </ChakraProvider>
)
