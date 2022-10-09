import { fireEvent, screen } from "@testing-library/react"
import { render } from "test/utils"

import { PlayerColorInput } from "./PlayerColorInput"

describe("PlayerColorInput", () => {
  it("should show the initial value", () => {
    const onChangeMock = jest.fn()
    render(<PlayerColorInput value="red.600" onChange={onChangeMock} />)

    const input = screen.getByLabelText("Player color")
    expect(input).toHaveValue("red.600")
  })

  it("should trigger the onChange when select new color", () => {
    const onChangeMock = jest.fn()
    render(<PlayerColorInput value="red.600" onChange={onChangeMock} />)

    const green = screen.getByLabelText(/Select player color green/i)
    fireEvent.click(green)

    expect(onChangeMock).toHaveBeenCalledWith(expect.stringMatching(/green/i))
  })

  it("should trigger the onChange with keyboard navigation", () => {
    const onChangeMock = jest.fn()
    render(<PlayerColorInput value="red.600" onChange={onChangeMock} />)

    const colorSelection = screen.getByLabelText(/color selection/i)
    fireEvent.focus(colorSelection)

    fireEvent.keyDown(colorSelection, { key: "ArrowLeft" })
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(String))

    fireEvent.keyDown(colorSelection, { key: "ArrowDown" })
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(String))

    fireEvent.keyDown(colorSelection, { key: "ArrowRight" })
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(String))

    fireEvent.keyDown(colorSelection, { key: "ArrowUp" })
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(String))
  })
})
