import { fireEvent, render, screen } from "test/utils"

import { TickingIconButton } from "./TickingIconButton"

describe("TickingIconButton", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should tick on click", () => {
    const onTickMock = vi.fn()
    render(
      <TickingIconButton onTick={onTickMock} aria-label="ticking button" />
    )
    const button = screen.getByLabelText("ticking button")
    fireEvent.click(button)
    expect(onTickMock).toHaveBeenCalled()
  })

  it("should tick multiple times when pointer is hold down", () => {
    const onTickMock = vi.fn()
    render(
      <TickingIconButton onTick={onTickMock} aria-label="ticking button" />
    )
    const button = screen.getByLabelText("ticking button")
    fireEvent.pointerDown(button)
    vi.advanceTimersByTime(500 + 450 + 400)
    fireEvent.pointerUp(button)

    expect(onTickMock).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(1_000)
    // and should stop ticking
    expect(onTickMock).toHaveBeenCalledTimes(3)
  })
})
