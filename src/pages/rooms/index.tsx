import { IconButtonLink } from '../../components/button.tsx'
import { useRoomStore } from '../../features/rooms/use-rooms.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../layout/layout.tsx'
import type { ReactNode } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppLayout>
      <AppLayoutHeader title="Rooms">
        <IconButtonLink to="/rooms/add">
          <FiPlus />
        </IconButtonLink>
      </AppLayoutHeader>
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function RoomsPage() {
  const rooms = useRoomStore((state) => state.rooms)
  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>
          <Link to={`/rooms/${room.id}`}>{room.name}</Link>
        </li>
      ))}
    </ul>
  )
}
