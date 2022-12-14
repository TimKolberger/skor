import { render, screen, fireEvent } from "test/utils"

import { TickingIconButton } from "./TickingIconButton"

describe("TickingIconButton", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("should tick on click", () => {
    const onTickMock = jest.fn()
    render(
      <TickingIconButton onTick={onTickMock} aria-label="ticking button" />
    )
    const button = screen.getByLabelText("ticking button")
    fireEvent.click(button)
    expect(onTickMock).toHaveBeenCalled()
  })

  it("should tick multiple times when pointer is hold down", () => {
    const onTickMock = jest.fn()
    render(
      <TickingIconButton onTick={onTickMock} aria-label="ticking button" />
    )
    const button = screen.getByLabelText("ticking button")
    fireEvent.pointerDown(button)
    jest.advanceTimersByTime(500 + 450 + 400)
    fireEvent.pointerUp(button)

    expect(onTickMock).toHaveBeenCalledTimes(3)
    jest.advanceTimersByTime(1_000)
    // and should stop ticking
    expect(onTickMock).toHaveBeenCalledTimes(3)
  })
})
