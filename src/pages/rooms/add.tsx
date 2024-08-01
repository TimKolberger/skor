import { Button } from '../../components/button'
import { RoomForm } from '../../features/rooms/room-form'
import { RoomIdInput } from '../../features/rooms/room-id-input'
import { RoomSchema, useRoomStore } from '../../features/rooms/use-rooms'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../layout/layout'
import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { parse } from 'valibot'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppLayout>
      <AppLayoutHeader title="Add room" backLink="/rooms" />
      <AppLayoutContent variant="max-width">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function AddRoomPage() {
  const navigate = useNavigate()
  const { addRoom } = useRoomStore()

  return (
    <RoomForm
      onSubmit={(room) => {
        addRoom(parse(RoomSchema, room))
        navigate(`/rooms/${room.id}`)
      }}
    >
      <div className="flex flex-col gap-1">
        <RoomIdInput />
        <p className="text-xs leading-4 text-slate-200">
          Join a room with an ID. You can find it in the Share dialog.
        </p>
      </div>
      <Button type="submit" variant="primary">
        Add room
      </Button>
    </RoomForm>
  )
}
