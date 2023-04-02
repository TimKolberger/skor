import { screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { render } from "test/utils"

import { routes } from "./routes"

describe("Routes", () => {
  it.each(
    routes
      .filter((r) => r.path && !r.path.includes(":"))
      .map((r) => [r.path, r])
  )("should render %s", async (path) => {
    const router = createMemoryRouter(routes, {
      initialEntries: [path ?? "/not-found"],
    })
    render(<div />, {
      Router: () => <RouterProvider router={router} />,
    })

    await screen.findByRole("main")
  })
})
