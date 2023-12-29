import { IconButton, IconButtonLink } from '../../../components/button.tsx'
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from '../../../components/menu.tsx'
import { Game } from '../../../features/rooms/game.tsx'
import { RoomProvider } from '../../../features/rooms/room-provider.tsx'
import { ShareRoom } from '../../../features/rooms/share-room.tsx'
import { useCurrentRoom } from '../../../features/rooms/use-current-room.ts'
import { usePlayers } from '../../../features/rooms/use-players.ts'
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
  FiGithub,
  FiInfo,
  FiMoreVertical,
  FiRepeat,
  FiTrendingDown,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

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
      <AppLayoutHeader title={room.name}>
        <IconButtonLink to="/rooms">
          <FiChevronLeft />
        </IconButtonLink>
        <ShareRoom room={room} />
        <IconButton
          onClick={() =>
            setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
          }
        >
          {sortDirection === 'desc' ? <FiTrendingDown /> : <FiTrendingUp />}
        </IconButton>
        <IconButtonLink to="players/add">
          <FiUserPlus />
        </IconButtonLink>
        <Menu>
          <MenuButton variant="ghost" padding="slim">
            <FiMoreVertical />
          </MenuButton>
          <MenuContent>
            <MenuItem
              onClick={() => {
                setAllScores(0)
              }}
            >
              <FiRepeat />
              Reset all Scores
            </MenuItem>
            <MenuItem
              onClick={() => {
                removeAllPlayers()
              }}
            >
              <FiUsers />
              Delete all Players
            </MenuItem>
            <MenuItem
              onClick={() => {
                removeRoom(room.id)
                navigate('/rooms')
              }}
            >
              <FiDelete />
              Delete Room
            </MenuItem>
            <MenuSeparator />
            <MenuItem
              render={(props) => (
                <a
                  {...props}
                  href="https://github.com/TimKolberger/skor"
                  target="_blank"
                  rel="noreferrer"
                />
              )}
            >
              <FiGithub />
              Open Source on GitHub
            </MenuItem>
            <MenuItem
              render={(props) => <Link {...props} to="/legal-notice" />}
            >
              <FiInfo />
              Legal Notice
            </MenuItem>
          </MenuContent>
        </Menu>
      </AppLayoutHeader>
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function RoomPage() {
  return <Game />
}
