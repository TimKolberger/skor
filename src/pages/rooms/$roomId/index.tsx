import { IconButton, IconButtonLink } from '../../../components/button.tsx'
import { Game } from '../../../features/rooms/game.tsx'
import { RoomProvider } from '../../../features/rooms/room-provider.tsx'
import { ShareRoom } from '../../../features/rooms/share-room.tsx'
import { useCurrentRoom } from '../../../features/rooms/use-current-room.ts'
import { useRoomStore } from '../../../features/rooms/use-rooms.ts'
import { useSettings } from '../../../features/rooms/use-settings.ts'
import type { LayoutProps } from '../../../features/router/types.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../layout/layout.tsx'
import {
  FiChevronLeft,
  FiDelete,
  FiTrendingDown,
  FiTrendingUp,
  FiUserPlus,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <RoomProvider>
      <PageLayout>{children}</PageLayout>
    </RoomProvider>
  )
}

const PageLayout = ({ children }: LayoutProps) => {
  const navigate = useNavigate()
  const removeRoom = useRoomStore((state) => state.removeRoom)
  const room = useCurrentRoom()
  const { sortDirection, setSortDirection } = useSettings()
  return (
    <AppLayout>
      <AppLayoutHeader title={room.name}>
        <IconButtonLink to="/rooms">
          <FiChevronLeft />
        </IconButtonLink>
        <IconButton
          onClick={() => {
            removeRoom(room.id)
            navigate('/rooms')
          }}
        >
          <FiDelete />
        </IconButton>
        <IconButton
          onClick={() =>
            setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
          }
        >
          {sortDirection === 'desc' ? <FiTrendingDown /> : <FiTrendingUp />}
        </IconButton>
        <ShareRoom room={room} />
        <IconButtonLink to="players/add">
          <FiUserPlus />
        </IconButtonLink>
      </AppLayoutHeader>
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function RoomPage() {
  return <Game />
}
