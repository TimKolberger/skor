import { RoomSchema, useRoomStore } from '../../../features/rooms/use-rooms.ts'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { parse } from 'valibot'

export default function JoinRoomPage() {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')
  const { addRoom, rooms } = useRoomStore()

  useEffect(() => {
    if (!roomId) {
      return
    }
    addRoom(parse(RoomSchema, { id: roomId, name }))
  }, [addRoom, name, roomId])

  useEffect(() => {
    if (rooms.some((room) => room.id === roomId)) {
      navigate(`/rooms/${roomId}`)
    }
  }, [rooms, roomId, navigate])

  return null
}
