import { fireEvent, screen, waitFor, within } from "@testing-library/react"
import { render } from "test/utils"

import { RemovePlayer } from "./RemovePlayer"

describe("Remove Player", () => {
  it("should trigger the onRemove callback on confirmation", () => {
    const player = { id: "1", name: "Player name" }
    const onRemoveMock = jest.fn()
    render(<RemovePlayer player={player} onRemove={onRemoveMock} />)
    const removeButton = screen.getByRole("button")
    fireEvent.click(removeButton)
    const alertDialog = screen.getByRole("alertdialog")
    const confirmButton = within(alertDialog).getByRole("button", {
      name: /remove/i,
    })
    fireEvent.click(confirmButton)
    expect(onRemoveMock).toHaveBeenCalled()
    waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    )
  })
})
