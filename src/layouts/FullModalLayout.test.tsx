import { screen } from "@testing-library/react"
import { render } from "test/utils"

import { FullModalLayout } from "./FullModalLayout"

describe("FullModalLayout", () => {
  it("should render children", () => {
    render(
      <FullModalLayout>
        <div data-testid="target" />
      </FullModalLayout>
    )

    screen.getByTestId("target")
  })

  it("should have a close button", () => {
    render(<FullModalLayout to="/somewhere" />)

    const closeButton = screen.getByRole("link", { name: "Close" })
    expect(closeButton).toHaveAttribute("href", "/somewhere")
  })
})
