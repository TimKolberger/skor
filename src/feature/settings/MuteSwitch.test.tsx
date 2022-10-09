import { fireEvent, screen } from "@testing-library/react"
import { render } from "test/utils"

import { MuteSwitch } from "./MuteSwitch"

describe("Mute Switch", () => {
  it("should persist the mute setting", () => {
    const { rerender } = render(<MuteSwitch key="one key" />)
    const switchButton = screen.getByRole("checkbox")

    expect(switchButton).not.toBeChecked()

    fireEvent.click(switchButton)

    rerender(<MuteSwitch key="another key" />)
    const switchButtonAfterRerender = screen.getByRole("checkbox")

    expect(switchButtonAfterRerender).toBeChecked()
  })
})
