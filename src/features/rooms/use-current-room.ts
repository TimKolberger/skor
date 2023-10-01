import { useRoomStore } from './use-rooms.ts'
import { useParams } from 'react-router-dom'

export function useCurrentRoom() {
  const params = useParams<{ roomId: string }>()
  const { rooms } = useRoomStore()
  const room = rooms.find((room) => room.id === params.roomId)

  if (!room) {
    throw new Error(`Room not found: ${params.roomId}`)
  }

  return room
}