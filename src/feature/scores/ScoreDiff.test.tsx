import { screen } from "@testing-library/react"
import { render } from "test/utils"

import { ScoreDiff } from "./ScoreDiff"

describe("ScoreDiff", () => {
  it("should show the total value of 0", () => {
    render(<ScoreDiff scoreSlice={{ total: 0, diff: 0 }} />)
    const elements = screen.getAllByText("0")
    expect(elements).toHaveLength(1)
  })

  it("should show diff value", () => {
    render(<ScoreDiff scoreSlice={{ total: 0, diff: 22 }} />)
    screen.getByText("0")
    screen.getByText("22")
  })

  it("should not show a zero diff value", () => {
    render(<ScoreDiff scoreSlice={{ total: 22, diff: 0 }} />)
    screen.getByText("22")
    expect(screen.queryByText("0")).not.toBeInTheDocument()
  })
})
