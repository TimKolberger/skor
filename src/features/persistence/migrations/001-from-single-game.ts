import { createUniqueId } from '../../../utils/create-unique-id.ts'
import { generatePlayerName } from '../../players/generate-player-name.ts'
import { playerColors } from '../../players/player-colors.ts'
import { generateRoomName } from '../../rooms/generate-room-name.ts'
import type { Player, ScoreAction } from '../../rooms/use-players.ts'
import { type Room, useRoomStore } from '../../rooms/use-rooms.ts'
import { safeJsonParse } from '../safe-json-parse.ts'
import { IndexeddbPersistence } from 'y-indexeddb'
import { Doc } from 'yjs'

export const migration001 = async () => {
  // clear previous data
  for (const key of ['chakra-ui-color-mode', 'SKOR:STEP', 'SKOR:MUTED']) {
    localStorage.removeItem(key)
  }

  const prevPlayers = safeJsonParse<
    null | Record<'name' | 'color' | 'id', string>[]
  >(localStorage.getItem('SKOR:PLAYERS'), null)
  const prevScore = safeJsonParse<null | Record<
    string,
    { total: number; diff: number }
  >>(localStorage.getItem('SKOR:SCORE'), null)

  if (prevPlayers?.length && prevScore) {
    const now = new Date().toISOString()
    const room: Room = {
      id: createUniqueId(),
      name: generateRoomName(),
      createdAt: now,
      updatedAt: now,
    }

    const yDoc = new Doc()
    const docName = `cardscore:${room.id}`
    new IndexeddbPersistence(docName, yDoc)

    useRoomStore.setState({
      rooms: [room],
    })

    const yPlayers = yDoc.getMap<Player>('players')
    const yScores = yDoc.getArray<ScoreAction>('scores')
    for (let i = 0; i < prevPlayers.length; i++) {
      const prevPlayer = prevPlayers[i]
      const id = createUniqueId()
      yPlayers.set(id, {
        id,
        color:
          playerColors[i % playerColors.length] ??
          playerColors[Math.floor(Math.random() * playerColors.length)],
        name: prevPlayer.name ?? generatePlayerName(),
        createdAt: now,
        updatedAt: now,
      })
      yScores.push([
        {
          playerId: id,
          scoreDiff: prevScore[prevPlayer.id]?.total ?? 0,
        },
      ])
    }
  }

  localStorage.removeItem('SKOR:PLAYERS')
  localStorage.removeItem('SKOR:SCORE')
  localStorage.removeItem('SKOR:SORT')
}
