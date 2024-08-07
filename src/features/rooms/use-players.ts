import { useDebounce } from '../../components/use-debounce'
import { useLatestRef } from '../../components/use-latest-ref'
import { createUniqueId } from '../../utils/create-unique-id'
import { useArray, useMap } from '../collaboration/y-doc-provider'
import { DOC_ID_PLAYERS, DOC_ID_SCORES } from './constants'
import { type SortDirection, useSettings } from './use-settings'
import { useCallback, useEffect, useMemo } from 'react'
import {
  type InferOutput,
  isoTimestamp,
  nullish,
  object,
  pipe,
  string,
  transform,
  unknown,
} from 'valibot'

export const PlayerSchema = object({
  id: pipe(
    unknown(),
    transform((id) => {
      if (id) return String(id)
      return createUniqueId()
    }),
  ),
  name: pipe(
    unknown(),
    transform((name) => {
      if (name) return String(name)
      return 'Unnamed player'
    }),
  ),
  color: pipe(
    unknown(),
    transform((value) => {
      if (value) return String(value)
      return 'red'
    }),
  ),
  createdAt: nullish(pipe(string(), isoTimestamp())),
  updatedAt: nullish(pipe(string(), isoTimestamp())),
})

export type Player = InferOutput<typeof PlayerSchema>
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

export type ScoreAction = {
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
  } = useMap<Player>(DOC_ID_PLAYERS)
  const { state: scoreState, push: pushScore } =
    useArray<ScoreAction>(DOC_ID_SCORES)

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
