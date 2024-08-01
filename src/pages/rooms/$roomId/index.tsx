import { IconButton, IconButtonLink } from '../../../components/button'
import { MenuItem, MenuSeparator } from '../../../components/menu'
import { Game } from '../../../features/rooms/game'
import { RoomProvider } from '../../../features/rooms/room-provider'
import { ShareRoom } from '../../../features/rooms/share-room'
import { useCurrentRoom } from '../../../features/rooms/use-current-room'
import { usePlayers } from '../../../features/rooms/use-players'
import { useRoomStore } from '../../../features/rooms/use-rooms'
import { useSettings } from '../../../features/rooms/use-settings'
import type { LayoutProps } from '../../../features/router/types'
import { HeaderMenu } from '../../../layout/header-menu'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../layout/layout'
import {
  FiRepeat,
  FiShare,
  FiTrash2,
  FiTrendingDown,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
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
  const { removeAllPlayers, setAllScores } = usePlayers()
  const room = useCurrentRoom()
  const { sortDirection, setSortDirection } = useSettings()

  return (
    <AppLayout>
      <AppLayoutHeader title={room.name} backLink="/rooms">
        <IconButtonLink to="players/add">
          <FiUserPlus />
        </IconButtonLink>
        <ShareRoom room={room}>
          <IconButton>
            <FiShare />
          </IconButton>
        </ShareRoom>
        <HeaderMenu>
          <MenuItem
            onClick={() =>
              setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
            }
          >
            {sortDirection === 'asc' ? <FiTrendingDown /> : <FiTrendingUp />}
            Sort scores {sortDirection === 'asc' ? 'descending' : 'ascending'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAllScores(0)
            }}
          >
            <FiRepeat />
            Reset all scores
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            onClick={() => {
              removeAllPlayers()
            }}
          >
            <FiUsers />
            Delete all players
          </MenuItem>
          <MenuItem
            onClick={() => {
              removeRoom(room.id)
              navigate('/rooms')
            }}
          >
            <FiTrash2 />
            Delete room
          </MenuItem>
        </HeaderMenu>
      </AppLayoutHeader>
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function RoomPage() {
  return <Game />
}
