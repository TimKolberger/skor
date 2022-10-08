import { screen } from "@testing-library/react"
import { Route, Routes } from "react-router-dom"
import { render } from "test/utils"

import { routes } from "./routes"

describe("Routes", () => {
  it.each(
    routes
      .filter((r) => r.path && !r.path.includes(":"))
      .map((r) => [r.path, r])
  )("should render %s", async (path, route) => {
    render(
      <Routes>
        <Route {...route} />
      </Routes>,
      {
        initialEntries: [path ?? "/not-found"],
      }
    )

    await screen.findByRole("main")
  })
})
