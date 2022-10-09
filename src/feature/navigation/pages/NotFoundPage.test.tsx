import { screen } from "@testing-library/react"
import { render } from "test/utils"

import NotFoundPage from "./NotFoundPage"

describe("Not Found Page", () => {
  it("should render an alert", () => {
    render(<NotFoundPage />)
    screen.getByRole("alert")
  })
})
