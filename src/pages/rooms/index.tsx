import { ButtonLink, IconButtonLink } from '../../components/button'
import { IconContainer } from '../../components/icon-container'
import { Time } from '../../components/time'
import { useRoomStore } from '../../features/rooms/use-rooms'
import { HeaderMenu } from '../../layout/header-menu'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../layout/layout'
import { type ReactNode } from 'react'
import { FiBox, FiChevronRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppLayout>
      <AppLayoutHeader title="Rooms">
        <IconButtonLink to="add">
          <FiPlus />
        </IconButtonLink>
        <HeaderMenu />
      </AppLayoutHeader>
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function RoomsPage() {
  const rooms = useRoomStore((state) => state.rooms)
  const sortedRooms = rooms
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )

  if (!sortedRooms.length) {
    return <EmptyRooms />
  }

  return (
    <ul className="divide-y divide-slate-100 divide-opacity-25">
      {sortedRooms.map((room) => (
        <li
          key={room.id}
          className="relative flex px-4 py-4 transition-colors hover:bg-slate-200 hover:bg-opacity-10"
        >
          <div className="flex flex-col">
            <Link
              to={room.id}
              className="text-lg font-black before:absolute before:inset-0"
            >
              {room.name}
            </Link>
            <div className="flex">
              <Time dateTime={room.createdAt} />
            </div>
          </div>
          <div className="ml-auto flex items-center px-2 text-2xl">
            <FiChevronRight />
          </div>
        </li>
      ))}
    </ul>
  )
}

function EmptyRooms() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <IconContainer>
        <FiBox />
      </IconContainer>
      <p className="text-center text-2xl font-black">
        There are no game rooms.
      </p>
      <ButtonLink to="add" variant="primary">
        Create room
      </ButtonLink>
    </div>
  )
}
