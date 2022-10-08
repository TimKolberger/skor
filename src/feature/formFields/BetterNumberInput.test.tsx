import { fireEvent, screen } from "@testing-library/react"
import { render } from "test/utils"

import { BetterNumberInput } from "./BetterNumberInput"

describe("BetterNumberInput", () => {
  it("should show the initial value", () => {
    const onChangeMock = jest.fn()
    render(<BetterNumberInput value={1337} onChange={onChangeMock} />)

    const input = screen.getByLabelText(/score/i)

    expect(input).toHaveValue("1337")
  })

  it("should trigger the onChange when updated", () => {
    const onChangeMock = jest.fn()
    render(<BetterNumberInput value={1337} onChange={onChangeMock} />)

    const input = screen.getByLabelText(/score/i)
    fireEvent.change(input, { target: { value: 100 } })

    expect(onChangeMock).toHaveBeenCalledWith(100)
  })
})
