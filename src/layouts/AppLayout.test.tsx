import { screen } from "@testing-library/react"
import { render } from "test/utils"

import { AppLayout } from "./AppLayout"

describe("AppLayout", () => {
  it("should render children", () => {
    render(
      <AppLayout>
        <div data-testid="target" />
      </AppLayout>
    )

    screen.getByTestId("target")
  })
})
