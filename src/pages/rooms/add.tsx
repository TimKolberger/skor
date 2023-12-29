import { Button, IconButtonLink } from '../../components/button.tsx'
import { RoomForm } from '../../features/rooms/room-form.tsx'
import { RoomSchema, useRoomStore } from '../../features/rooms/use-rooms.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../layout/layout.tsx'
import { type ReactNode } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { parse } from 'valibot'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppLayout>
      <AppLayoutHeader title="Add Room">
        <IconButtonLink to="/rooms">
          <FiChevronLeft />
        </IconButtonLink>
      </AppLayoutHeader>
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
      <Button type="submit" variant="primary">
        Add room
      </Button>
    </RoomForm>
  )
}
