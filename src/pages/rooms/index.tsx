import { IconButtonLink } from '../../components/button.tsx'
import { Time } from '../../components/time.tsx'
import { useRoomStore } from '../../features/rooms/use-rooms.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../layout/layout.tsx'
import type { ReactNode } from 'react'
import { FiChevronRight, FiPlus } from 'react-icons/fi'
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
  const rooms = useRoomStore((state) =>
    state.rooms
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      ),
  )

  if (!rooms.length) {
    return <EmptyRooms />
  }

  return (
    <ul className="divide-y divide-slate-100">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="relative flex px-4 py-4 transition-colors hover:bg-slate-200 hover:bg-opacity-10"
        >
          <div className="flex flex-col">
            <Link
              to={`/rooms/${room.id}`}
              className="text-lg font-black before:absolute before:inset-0"
            >
              {room.name}
            </Link>
            <div className="flex justify-evenly">
              <Time dateTime={room.createdAt} />
            </div>
          </div>
          <div className="ml-auto flex items-center text-2xl">
            <FiChevronRight />
          </div>
        </li>
      ))}
    </ul>
  )
}

function EmptyRooms() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-2xl font-black">
      <p>No game rooms yet.</p>
      <p>
        Get started and{' '}
        <Link to="add" className="underline">
          create one!
        </Link>
      </p>
    </div>
  )
}
