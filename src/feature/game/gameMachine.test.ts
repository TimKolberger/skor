import { interpret } from "xstate"

import { gameMachine } from "./gameMachine"

describe("GameMachine", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should go idle", () => {
    const state = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .transition("counting", {
        type: "IDLE",
      })

    expect(state.value).toBe("idle")
  })

  it("should set step", () => {
    const state = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .transition("idle", {
        type: "SET_STEP",
        step: 1337,
      })

    expect(state.context.step).toBe(1337)
  })

  it("should set sort", () => {
    const state = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .transition("idle", {
        type: "SET_SORT",
        sort: "desc",
      })

    expect(state.context.sort).toBe("desc")
  })

  it("should toggle sort", () => {
    const state = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .transition("idle", {
        type: "TOGGLE_SORT",
      })

    expect(state.context.sort).toBe("desc")
  })

  it("should set players", () => {
    const players = [
      { id: "1", name: "player name", color: "player color" },
      { id: "2", name: "some other name", color: "some other  color" },
    ]

    const state = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .transition("idle", {
        type: "SET_PLAYERS",
        players,
      })

    expect(state.context.players).toStrictEqual(players)
  })

  it("should set score", () => {
    const IDLE_DELAY = 3_600

    const machine = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [
          { id: "1", name: "player name", color: "player color" },
          { id: "2", name: "some other name", color: "some other  color" },
        ],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .withConfig({
        delays: {
          IDLE_DELAY,
        },
      })

    const service = interpret(machine)
    service.start()

    service.send({
      type: "SET_SCORE",
      playerId: "1",
      score: 1337,
      operator: "set",
    })

    expect(service.getSnapshot().context.scores["1"]?.diff).toBe(1337)
    vi.advanceTimersByTime(IDLE_DELAY)
    expect(service.getSnapshot().context.scores["1"]?.diff).toBe(0)
    expect(service.getSnapshot().context.scores["1"]?.total).toBe(1337)
  })

  it("should increment", () => {
    const IDLE_DELAY = 3_600

    const machine = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [
          { id: "1", name: "player name", color: "player color" },
          { id: "2", name: "some other name", color: "some other  color" },
        ],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .withConfig({
        delays: {
          IDLE_DELAY,
        },
      })

    const service = interpret(machine)
    service.start()

    service.send({
      type: "INCREMENT",
      playerId: "1",
    })

    expect(service.getSnapshot().context.scores["1"]?.diff).toBe(1)
    vi.advanceTimersByTime(IDLE_DELAY)
    expect(service.getSnapshot().context.scores["1"]?.diff).toBe(0)
    expect(service.getSnapshot().context.scores["1"]?.total).toBe(1)
  })

  it("should decrement", () => {
    const IDLE_DELAY = 3_600

    const machine = gameMachine
      .withContext({
        id: "game-id",
        name: "game-name",
        createdAt: new Date().toISOString(),
        players: [
          { id: "1", name: "player name", color: "player color" },
          { id: "2", name: "some other name", color: "some other  color" },
        ],
        sort: "asc",
        step: 1,
        scores: {},
        lastActivePlayer: null,
      })
      .withConfig({
        delays: {
          IDLE_DELAY,
        },
      })

    const service = interpret(machine)
    service.start()

    service.send({
      type: "DECREMENT",
      playerId: "1",
    })

    expect(service.getSnapshot().context.scores["1"]?.diff).toBe(-1)
    vi.advanceTimersByTime(IDLE_DELAY)
    expect(service.getSnapshot().context.scores["1"]?.diff).toBe(0)
    expect(service.getSnapshot().context.scores["1"]?.total).toBe(-1)
  })
})

export {}
