import { playerMachine } from "./playerMachine"

describe("PlayerMachine", () => {
  it("should add a player", () => {
    const state = playerMachine.transition("idle", {
      type: "ADD_PLAYER",
      player: { name: "player name", color: "player color" },
    })

    expect(state.context.players).toStrictEqual([
      { id: expect.any(String), name: "player name", color: "player color" },
    ])
  })

  it("should update a player", () => {
    const state = playerMachine
      .withContext({
        players: [
          { id: "1", name: "player name", color: "player color" },
          { id: "2", name: "some other name", color: "some other  color" },
        ],
      })
      .transition("idle", {
        type: "UPDATE_PLAYER",
        player: { id: "1", name: "updated name", color: "updated color" },
      })

    expect(state.context.players).toStrictEqual([
      { id: "1", name: "updated name", color: "updated color" },
      { id: "2", name: "some other name", color: "some other  color" },
    ])
  })

  it("should remove a player", () => {
    const state = playerMachine
      .withContext({
        players: [
          { id: "1", name: "player name", color: "player color" },
          { id: "2", name: "some other name", color: "some other  color" },
        ],
      })
      .transition("idle", {
        type: "REMOVE_PLAYER",
        playerId: "1",
      })
    expect(state.context.players).toStrictEqual([
      { id: "2", name: "some other name", color: "some other  color" },
    ])
  })

  it("should clear all players", () => {
    const state = playerMachine
      .withContext({
        players: [
          { id: "1", name: "player name", color: "player color" },
          { id: "2", name: "some other name", color: "some other  color" },
        ],
      })
      .transition("idle", {
        type: "CLEAR_PLAYERS",
      })
    expect(state.context.players).toStrictEqual([])
  })
})

export {}
