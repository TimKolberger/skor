import { actions, assign, createMachine } from "xstate"

import { Player } from "../players/playerMachine"
import { ScoreOperator } from "../scores/ScoreOperatorFormField"

const { send, cancel } = actions

export interface ScoreSlice {
  total: number
  diff: number
}

export type SortType = "asc" | "desc"

export interface GameContext {
  players: Player[]
  scores: Record<Player["id"], ScoreSlice>
  step: number
  lastActivePlayer: Player["id"] | null
  sort: SortType
}

type IncrementEvent = {
  type: "INCREMENT"
  playerId: Player["id"]
}

type DecrementEvent = {
  type: "DECREMENT"
  playerId: Player["id"]
}

type SetPlayersEvent = {
  type: "SET_PLAYERS"
  players: Player[]
}

type SetStepEvent = {
  type: "SET_STEP"
  step: number
}

type SetSortEvent = {
  type: "SET_SORT"
  sort: SortType
}

type ToggleSortEvent = {
  type: "TOGGLE_SORT"
}

type SetScoreEvent = {
  type: "SET_SCORE"
  playerId?: Player["id"]
  score: number
  operator: ScoreOperator
}

type IdleEvent = {
  type: "IDLE"
}

type GameEvent =
  | IncrementEvent
  | DecrementEvent
  | SetScoreEvent
  | IdleEvent
  | SetPlayersEvent
  | SetStepEvent
  | SetSortEvent
  | ToggleSortEvent

const idleTimerId = "idle-timer"

export const gameMachine = createMachine<GameContext, GameEvent>(
  {
    predictableActionArguments: true,

    context: {
      players: [],
      sort: "asc",
      step: 1,
      scores: {},
      lastActivePlayer: null,
    },

    id: "game",
    initial: "idle",
    states: {
      idle: {
        entry: ["calculateTotalScores", "clearActivePlayer"],
        on: {
          INCREMENT: {
            target: "counting",
            actions: ["setActivePlayer", "increment"],
            cond: "playerExists",
          },
          DECREMENT: {
            target: "counting",
            actions: ["setActivePlayer", "decrement"],
            cond: "playerExists",
          },
          SET_PLAYERS: {
            target: "idle",
            actions: ["setPlayers"],
          },
          SET_SCORE: {
            target: "counting",
            actions: ["setScore"],
          },
          SET_STEP: {
            target: "idle",
            actions: ["setStep"],
          },
          SET_SORT: {
            target: "idle",
            actions: ["setSort"],
          },
          TOGGLE_SORT: {
            target: "idle",
            actions: ["toggleSort"],
          },
        },
      },
      counting: {
        entry: ["startIdleTimer"],
        on: {
          INCREMENT: {
            target: "counting",
            actions: ["cancelIdleTimer", "setActivePlayer", "increment"],
            cond: "playerExists",
          },
          DECREMENT: {
            target: "counting",
            actions: ["cancelIdleTimer", "setActivePlayer", "decrement"],
            cond: "playerExists",
          },
          SET_SORT: {
            target: "idle",
            actions: ["cancelIdleTimer", "setSort"],
          },
          TOGGLE_SORT: {
            target: "idle",
            actions: ["cancelIdleTimer", "toggleSort"],
          },
          IDLE: {
            actions: ["cancelIdleTimer"],
            target: "idle",
          },
        },
      },
    },
  },
  {
    delays: {
      IDLE_DELAY: 4200,
    },
    actions: {
      startIdleTimer: send(
        { type: "IDLE" },
        { delay: "IDLE_DELAY", id: idleTimerId }
      ),
      cancelIdleTimer: cancel(idleTimerId),
      calculateTotalScores: assign({
        scores: (context) => calculateTotalScores(context),
      }),
      increment: assign({
        scores: (context, event) => {
          if (event.type !== "INCREMENT") {
            return context.scores
          }

          const prevScoreSlice = getPlayerScoreSlice(context, event.playerId)
          const nextScoreSlice: ScoreSlice = {
            total: prevScoreSlice.total,
            diff: prevScoreSlice.diff + context.step,
          }
          return {
            ...context.scores,
            [event.playerId]: nextScoreSlice,
          }
        },
      }),
      decrement: assign({
        scores: (context, event) => {
          if (event.type !== "DECREMENT") {
            return context.scores
          }
          const prevScoreSlice = getPlayerScoreSlice(context, event.playerId)
          const nextScoreSlice: ScoreSlice = {
            total: prevScoreSlice.total,
            diff: prevScoreSlice.diff - context.step,
          }
          return {
            ...context.scores,
            [event.playerId]: nextScoreSlice,
          }
        },
      }),
      setActivePlayer: assign({
        lastActivePlayer: (context, event) => {
          if (!("playerId" in event) || !event.playerId) {
            return context.lastActivePlayer
          }
          return event.playerId
        },
      }),
      clearActivePlayer: assign({
        lastActivePlayer: (_context) => null,
      }),
      setPlayers: assign({
        players: (context, event) => {
          if (!("players" in event)) {
            return context.players
          }
          return event.players
        },
        scores: (context, event) => {
          if (!("players" in event)) {
            return context.scores
          }
          return event.players.reduce((previousValue, player) => {
            previousValue[player.id] = context.scores[player.id] || {
              total: 0,
              diff: 0,
            }
            return previousValue
          }, {} as GameContext["scores"])
        },
      }),
      setStep: assign({
        step: (context, event) => {
          if (!("step" in event)) {
            return context.step
          }
          return event.step
        },
      }),
      setScore: assign({
        scores: (context, event) => {
          if (
            !("playerId" in event) ||
            !("score" in event) ||
            !("operator" in event)
          ) {
            return context.scores
          }

          const playerIds = event.playerId
            ? [event.playerId]
            : Object.keys(context.scores)

          const nextScores = { ...context.scores }
          for (const playerId of playerIds) {
            const scoreSlice = getPlayerScoreSlice(context, playerId)
            const nextTotal = calcNextScore(
              scoreSlice.total,
              event.operator,
              event.score
            )
            const total = nextScores[playerId]?.total || 0
            const diff = nextTotal - total
            nextScores[playerId] = {
              total,
              diff,
            }
          }

          return nextScores
        },
      }),
      setSort: assign({
        sort: (context, event) => {
          if (!("sort" in event)) {
            return context.sort
          }
          return event.sort
        },
      }),
      toggleSort: assign({
        sort: (context) => (context.sort !== "asc" ? "asc" : "desc"),
      }),
    },
    guards: {
      playerExists: (context, event) => {
        if (!("playerId" in event)) {
          return false
        }
        return context.players.some((player) => player.id === event.playerId)
      },
    },
  }
)

function getPlayerScoreSlice(
  context: GameContext,
  playerId: Player["id"]
): ScoreSlice {
  return context.scores[playerId] || { diff: 0, total: 0 }
}

function calculateTotalScores(context: GameContext) {
  return Object.entries(context.scores).reduce<GameContext["scores"]>(
    (previousValue, [key, slice]) => {
      previousValue[key] = {
        total: slice.total + slice.diff,
        diff: 0,
      }
      return previousValue
    },
    {}
  )
}

export function calcNextScore(
  total: number,
  operator: ScoreOperator,
  score: number
) {
  return {
    add: () => (total || 0) + score,
    sub: () => (total || 0) - score,
    set: () => score,
  }[operator]()
}
