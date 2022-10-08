import { screen } from "@testing-library/react"
import { render } from "test/utils"

import { BaseLayout } from "./BaseLayout"

describe("BaseLayout", () => {
  it("should render children", () => {
    render(
      <BaseLayout>
        <div data-testid="target" />
      </BaseLayout>
    )

    screen.getByTestId("target")
  })
})
