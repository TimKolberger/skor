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
import { useWakeLockContext } from '../../../features/wake-lock/use-wake-lock-context.tsx'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../layout/layout.tsx'
import {
  FiChevronLeft,
  FiGithub,
  FiInfo,
  FiMoreVertical,
  FiRepeat,
  FiShare,
  FiSunrise,
  FiSunset,
  FiTrash2,
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
  const wakeLock = useWakeLockContext()
  console.log(wakeLock)
  return (
    <AppLayout>
      <AppLayoutHeader title={room.name}>
        <IconButtonLink to="/rooms">
          <FiChevronLeft />
        </IconButtonLink>
        <IconButtonLink to="players/add">
          <FiUserPlus />
        </IconButtonLink>
        <ShareRoom room={room}>
          <IconButton>
            <FiShare />
          </IconButton>
        </ShareRoom>
        <Menu>
          <MenuButton variant="ghost" padding="slim">
            <FiMoreVertical />
          </MenuButton>
          <MenuContent align="end">
            <MenuItem
              onClick={() =>
                setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
              }
            >
              {sortDirection === 'asc' ? <FiTrendingDown /> : <FiTrendingUp />}
              Sort Scores {sortDirection === 'asc' ? 'descending' : 'ascending'}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAllScores(0)
              }}
            >
              <FiRepeat />
              Reset all Scores
            </MenuItem>
            <MenuSeparator />
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
              <FiTrash2 />
              Delete Room
            </MenuItem>
            <MenuSeparator />
            {wakeLock.isSupported ? (
              <MenuItem
                onClick={async () => {
                  if (wakeLock.type === 'screen') {
                    await wakeLock.release()
                  } else {
                    await wakeLock.request()
                  }
                }}
              >
                {wakeLock.type === 'screen' ? (
                  <>
                    <FiSunset />
                    Allow screen to turn off
                  </>
                ) : (
                  <>
                    <FiSunrise />
                    Keep Screen on
                  </>
                )}
              </MenuItem>
            ) : null}
            <MenuItem asChild>
              <a
                href="https://github.com/TimKolberger/skor"
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub />
                Open Source on GitHub
              </a>
            </MenuItem>
            <MenuItem asChild>
              <Link to="/legal-notice">
                <FiInfo />
                Legal Notice
              </Link>
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
