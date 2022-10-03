import { assign, createMachine } from "xstate"

export interface Player {
  id: string
  name: string
  color: string
}

export interface PlayerContext {
  players: Player[]
}

type AddPlayerEvent = {
  type: "ADD_PLAYER"
  player: Omit<Player, "id">
}

type RemovePlayerEvent = {
  type: "REMOVE_PLAYER"
  playerId: Player["id"]
}

type UpdatePlayerEvent = {
  type: "UPDATE_PLAYER"
  player: Player
}

type ClearPlayersEvent = {
  type: "CLEAR_PLAYERS"
}

type PlayerEvent =
  | AddPlayerEvent
  | UpdatePlayerEvent
  | RemovePlayerEvent
  | ClearPlayersEvent

export const playerMachine = createMachine<PlayerContext, PlayerEvent>(
  {
    predictableActionArguments: true,

    context: {
      players: [],
    },

    id: "players",
    initial: "idle",
    states: {
      idle: {
        on: {
          ADD_PLAYER: {
            actions: ["addPlayer"],
          },
          REMOVE_PLAYER: {
            actions: ["removePlayer"],
          },
          UPDATE_PLAYER: {
            actions: ["updatePlayer"],
          },
          CLEAR_PLAYERS: {
            actions: ["clearPlayers"],
          },
        },
      },
    },
  },
  {
    actions: {
      addPlayer: assign({
        players: (context, event) => {
          if (event.type !== "ADD_PLAYER") {
            return context.players
          }

          const playerToAdd = event.player
          const player = { ...playerToAdd, id: generateId() }
          return [...context.players, player]
        },
      }),
      removePlayer: assign({
        players: (context, event) => {
          if (event.type !== "REMOVE_PLAYER") {
            return context.players
          }

          return context.players.filter(
            (player) => player.id !== event.playerId
          )
        },
      }),
      updatePlayer: assign({
        players: (context, event) => {
          if (event.type !== "UPDATE_PLAYER") {
            return context.players
          }

          const playerToUpdate = event.player
          return context.players.map((player) => {
            if (player.id !== playerToUpdate.id) {
              return player
            }
            return { ...player, ...playerToUpdate }
          })
        },
      }),
      clearPlayers: assign({
        players: (_context) => [],
      }),
    },
  }
)

function generateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}
