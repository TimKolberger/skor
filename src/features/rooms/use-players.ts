import { useDebounce } from '../../components/use-debounce.ts'
import { useLatestRef } from '../../components/use-latest-ref.ts'
import { createUniqueId } from '../../utils/create-unique-id.ts'
import { useArray, useMap } from '../collaboration/y-doc-provider.tsx'
import { type SortDirection, useSettings } from './use-settings.ts'
import { useCallback, useEffect, useMemo } from 'react'
import {
  coerce,
  isoTimestamp,
  minLength,
  nullish,
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
    return 'Unnamed player'
  }),
  color: coerce(string(), (value) => {
    if (value) return String(value)
    return 'red'
  }),
  createdAt: nullish(string([isoTimestamp()])),
  updatedAt: nullish(string([isoTimestamp()])),
})

export type Player = Output<typeof PlayerSchema>
export type PlayerWithScore = Player & { score: number }

function sortByScoreExtractId(
  state: Record<string, PlayerWithScore>,
  direction: SortDirection = 'desc',
) {
  return Object.values(state)
    .sort((a, b) =>
      direction === 'desc' ? b.score - a.score : a.score - b.score,
    )
    .map((p) => p.id)
}

export const DEBOUNCE_DELAY = 4_000

type ScoreAction = {
  playerId: Player['id']
  scoreDiff: number
}

function enhancePlayersWithScore(
  playersState: Record<string, Player>,
  scoreByPlayerId: Record<string, number>,
) {
  return Object.entries(playersState).reduce<
    Record<Player['id'], PlayerWithScore>
  >((acc, [id, player]) => {
    acc[id] = {
      ...player,
      score: scoreByPlayerId[id] ?? 0,
    }
    return acc
  }, {})
}

function scoreByPlayerIdLens(scoreState: ScoreAction[]) {
  return scoreState.reduce<Record<Player['id'], number>>(
    (acc, { playerId, scoreDiff }) => {
      if (!acc[playerId]) {
        acc[playerId] = 0
      }
      acc[playerId] += scoreDiff
      return acc
    },
    {},
  )
}

export function usePlayers() {
  const { ymap: settingsMap, sortDirection } = useSettings()
  const {
    state: playersState,
    set: setPlayer,
    remove: removePlayer,
  } = useMap<Player>('players')
  const { state: scoreState, push: pushScore } = useArray<ScoreAction>('scores')

  const { playersWithScore } = useMemo(
    () => ({
      playersWithScore: enhancePlayersWithScore(
        playersState,
        scoreByPlayerIdLens(scoreState),
      ),
    }),
    [playersState, scoreState],
  )

  const order = useMemo(
    () => sortByScoreExtractId(playersWithScore, sortDirection),
    [playersWithScore, sortDirection],
  )

  const [debouncedOrder, setDebouncedOrder] = useDebounce(order, DEBOUNCE_DELAY)

  useEffect(() => {
    if (debouncedOrder.length || !order.length) {
      return
    }
    setDebouncedOrder(order)
  }, [order, debouncedOrder, setDebouncedOrder])

  const playerStateRef = useLatestRef(playersWithScore)
  useEffect(() => {
    const listener: Parameters<typeof settingsMap.observe>[0] = (e) => {
      const newOrder = sortByScoreExtractId(
        playerStateRef.current,
        e.target.toJSON().sortDirection,
      )
      setDebouncedOrder(newOrder)
    }
    settingsMap.observe(listener)
    return () => {
      settingsMap.unobserve(listener)
    }
  }, [setDebouncedOrder, settingsMap, playerStateRef])

  return {
    players: useMemo(
      () => debouncedOrder.map((id) => playersWithScore[id]).filter(Boolean),
      [debouncedOrder, playersWithScore],
    ),
    addPlayer: useCallback(
      (player: Player) => {
        setPlayer(player.id, player)
      },
      [setPlayer],
    ),
    removePlayer: useCallback(
      (playerId: string) => {
        removePlayer(playerId)
      },
      [removePlayer],
    ),
    removeAllPlayers: useCallback(() => {
      Object.keys(playerStateRef.current).forEach(removePlayer)
    }, [removePlayer, playerStateRef]),
    updatePlayer: useCallback(
      (player: Partial<Player> & { id: Player['id'] }) => {
        setPlayer(player.id, { ...playersState[player.id], ...player })
      },
      [setPlayer, playersState],
    ),
    updateScore: useCallback(
      (playerId: Player['id'], scoreDiff: number) => {
        pushScore([
          {
            playerId,
            scoreDiff,
          },
        ])
      },
      [pushScore],
    ),
    setAllScores: useCallback(
      (score: number) => {
        const actions = Object.entries(playerStateRef.current).map(
          ([playerId, playerWithScore]) => ({
            playerId,
            scoreDiff: -playerWithScore.score + score,
          }),
        )
        pushScore(actions)
      },
      [playerStateRef, pushScore],
    ),
  }
}
