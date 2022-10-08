import { fireEvent, screen } from "@testing-library/react"
import { render } from "test/utils"

import { ScoreForm } from "./ScoreForm"

describe("ScoreForm", () => {
  it("should submit without initial values", () => {
    const onSubmitMock = jest.fn()
    render(<ScoreForm onSubmit={onSubmitMock} />)

    const submitButton = screen.getByRole("button", { name: /save/i })
    fireEvent.click(submitButton)

    expect(onSubmitMock).toHaveBeenCalledWith({
      score: 0,
      operator: expect.stringMatching(/(sub|add|set)/),
    })
  })

  it.each(["set", "add", "sub"])(
    "should submit with the correct operator %s",
    (operator) => {
      const onSubmitMock = jest.fn()
      render(<ScoreForm onSubmit={onSubmitMock} />)

      const setButton = screen.getByRole("tab", {
        name: new RegExp(operator, "i"),
      })
      fireEvent.click(setButton)

      const scoreInput = screen.getByLabelText(/score/i)
      fireEvent.change(scoreInput, { target: { value: 1337 } })

      const submitButton = screen.getByRole("button", { name: /save/i })
      fireEvent.click(submitButton)

      expect(onSubmitMock).toHaveBeenCalledWith({
        score: 1337,
        operator,
      })
    }
  )
})
