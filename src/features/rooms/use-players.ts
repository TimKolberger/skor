import { useDebounce } from '../../components/use-debounce.ts'
import { useLatestRef } from '../../components/use-latest-ref.ts'
import { createUniqueId } from '../../utils/create-unique-id.ts'
import { useMap } from '../collaboration/y-doc-provider.tsx'
import { type SortDirection, useSettings } from './use-settings.ts'
import { useCallback, useEffect, useMemo, useState } from 'react'
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

function sortByScoreExtractId(
  state: Record<string, Player>,
  direction: SortDirection = 'desc',
) {
  return Object.values(state)
    .sort((a, b) =>
      direction === 'desc' ? b.score - a.score : a.score - b.score,
    )
    .map((p) => p.id)
}

export function usePlayers() {
  const { ymap: settingsMap, sortDirection } = useSettings()
  const { ymap: playersMap, state, set, remove } = useMap<Player>('players')
  const [order, setOrder] = useState(() =>
    sortByScoreExtractId(state, sortDirection),
  )
  const [debouncedOrder, setDebouncedOrder] = useDebounce(order, 5_000)

  const stateRef = useLatestRef(state)
  useEffect(() => {
    const listener: Parameters<typeof settingsMap.observe>[0] = (e) => {
      const newOrder = sortByScoreExtractId(
        stateRef.current,
        e.target.toJSON().sortDirection,
      )
      setOrder(newOrder)
      setDebouncedOrder(newOrder)
    }
    settingsMap.observe(listener)
    return () => {
      settingsMap.unobserve(listener)
    }
  }, [setDebouncedOrder, settingsMap, stateRef])

  useEffect(() => {
    const listener: Parameters<typeof playersMap.observe>[0] = (e) => {
      setOrder(sortByScoreExtractId(e.target.toJSON(), sortDirection))
    }
    playersMap.observe(listener)
    return () => {
      playersMap.unobserve(listener)
    }
  }, [sortDirection, playersMap])

  return {
    players: useMemo(
      () => debouncedOrder.map((id) => state[id]).filter(Boolean),
      [debouncedOrder, state],
    ),
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
