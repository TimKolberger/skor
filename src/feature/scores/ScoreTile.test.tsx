import { fireEvent, screen } from "@testing-library/react"
import { render } from "test/utils"

import { ScoreTile } from "./ScoreTile"

describe("ScoreTile", () => {
  it("should show the players name and score", () => {
    const onDecrementMock = jest.fn()
    const onIncrementMock = jest.fn()
    const player = { id: "1", name: "Player 1", color: "red.600" }
    const scoreSlice = { total: 1337, diff: 0 }

    render(
      <ScoreTile
        onDecrement={onDecrementMock}
        player={player}
        scoreSlice={scoreSlice}
        onIncrement={onIncrementMock}
      />
    )

    screen.getByText("Player 1")
    screen.getByText("1337")
  })

  it("should increment on click", () => {
    const onDecrementMock = jest.fn()
    const onIncrementMock = jest.fn()
    const player = { id: "1", name: "Player 1", color: "red.600" }
    const scoreSlice = { total: 1337, diff: 0 }

    render(
      <ScoreTile
        onDecrement={onDecrementMock}
        player={player}
        scoreSlice={scoreSlice}
        onIncrement={onIncrementMock}
      />
    )

    const incrementButton = screen.getByRole("button", { name: /increment/i })
    fireEvent.click(incrementButton)

    expect(onIncrementMock).toHaveBeenCalledTimes(1)
  })

  it("should decrement on click", () => {
    const onDecrementMock = jest.fn()
    const onIncrementMock = jest.fn()
    const player = { id: "1", name: "Player 1", color: "red.600" }
    const scoreSlice = { total: 1337, diff: 0 }

    render(
      <ScoreTile
        onDecrement={onDecrementMock}
        player={player}
        scoreSlice={scoreSlice}
        onIncrement={onIncrementMock}
      />
    )

    const decrementButton = screen.getByRole("button", { name: /decrement/i })
    fireEvent.click(decrementButton)

    expect(onDecrementMock).toHaveBeenCalledTimes(1)
  })
})
