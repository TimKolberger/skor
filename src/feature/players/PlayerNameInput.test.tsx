import { fireEvent, screen } from "@testing-library/react"
import { render } from "test/utils"

import { PlayerNameInput } from "./PlayerNameInput"

describe("PlayerNameInput", () => {
  it("should show the initial value", () => {
    const onChangeMock = vi.fn()
    render(<PlayerNameInput value="player name" onChange={onChangeMock} />)

    const input = screen.getByRole("textbox", { name: "Player name" })

    expect(input).toHaveValue("player name")
  })

  it("should trigger the onChange when updated", () => {
    const onChangeMock = vi.fn()
    render(<PlayerNameInput value="player name" onChange={onChangeMock} />)

    const input = screen.getByRole("textbox", { name: "Player name" })
    fireEvent.change(input, { target: { value: "updated name" } })

    expect(onChangeMock).toHaveBeenCalledWith("updated name")
  })

  it("should generate a random player name", () => {
    const onChangeMock = vi.fn()
    render(<PlayerNameInput value="player name" onChange={onChangeMock} />)

    const generateNameButton = screen.getByRole("button", {
      name: "Generate player name",
    })
    fireEvent.click(generateNameButton)

    expect(onChangeMock).not.toHaveBeenCalledWith("player name")
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(String))
  })
})
