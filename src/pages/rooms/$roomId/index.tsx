import { IconButtonLink } from '../../../components/button.tsx'
import { Game } from '../../../features/rooms/game.tsx'
import { RoomProvider } from '../../../features/rooms/room-provider.tsx'
import { ShareRoom } from '../../../features/rooms/share-room.tsx'
import { useCurrentRoom } from '../../../features/rooms/use-current-room.ts'
import type { LayoutProps } from '../../../features/router/types.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../layout/layout.tsx'
import { FiChevronLeft, FiUserPlus } from 'react-icons/fi'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <RoomProvider>
      <PageLayout>{children}</PageLayout>
    </RoomProvider>
  )
}

const PageLayout = ({ children }: LayoutProps) => {
  const room = useCurrentRoom()
  return (
    <AppLayout>
      <AppLayoutHeader title={room.name}>
        <IconButtonLink to="/rooms">
          <FiChevronLeft />
        </IconButtonLink>
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
