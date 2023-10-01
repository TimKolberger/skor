import { createUniqueId } from '../../utils/create-unique-id.ts'
import { useMap } from '../collaboration/y-doc-provider.tsx'
import { useCallback } from 'react'
import {
  coerce,
  isoTimestamp,
  minLength,
  nullish,
  number,
  object,
  type Output,
  string,
} from 'valibot'

export const PlayerSchema = object({
  id: coerce(string(), (id) => {
    if (id) return String(id)
    return createUniqueId()
  }),
  name: coerce(string([minLength(1)]), (name) => {
    if (name) return String(name)
    return 'Unnamed Player'
  }),
  score: coerce(number(), (value) => {
    if (value) return Number(value)
    return 0
  }),
  color: coerce(string(), (value) => {
    if (value) return String(value)
    return 'red'
  }),
  createdAt: nullish(string([isoTimestamp()])),
  updatedAt: nullish(string([isoTimestamp()])),
})

export type Player = Output<typeof PlayerSchema>

export function usePlayers() {
  const { state, set, remove } = useMap<Player>('players')

  return {
    players: state,
    addPlayer: useCallback(
      (player: Player) => {
        set(player.id, player)
      },
      [set],
    ),
    removePlayer: useCallback(
      (playerId: string) => {
        remove(playerId)
      },
      [remove],
    ),
    updatePlayer: useCallback(
      (player: Partial<Player> & { id: Player['id'] }) => {
        set(player.id, { ...state[player.id], ...player })
      },
      [set, state],
    ),
  }
}
