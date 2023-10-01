import { IconButtonLink } from '../../../../components/button.tsx'
import { RoomProvider } from '../../../../features/rooms/room-provider.tsx'
import { useCurrentRoom } from '../../../../features/rooms/use-current-room.ts'
import {
  PlayerSchema,
  usePlayers,
} from '../../../../features/rooms/use-players.ts'
import type { LayoutProps } from '../../../../features/router/types.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../../layout/layout.tsx'
import type { ReactNode } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { parse } from 'valibot'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <RoomProvider>
      <PageLayout>{children}</PageLayout>
    </RoomProvider>
  )
}

const PageLayout = ({ children }: { children: ReactNode }) => {
  const room = useCurrentRoom()
  return (
    <AppLayout>
      <AppLayoutHeader title="Add Player">
        <IconButtonLink to={`/rooms/${room.id}`}>
          <FiChevronLeft />
        </IconButtonLink>
      </AppLayoutHeader>
      <AppLayoutContent variant="max-width">{children}</AppLayoutContent>
    </AppLayout>
  )
}
export default function AddPlayerPage() {
  const { addPlayer } = usePlayers()
  const params = useParams<{ roomId: string }>()
  const navigate = useNavigate()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const player = Object.fromEntries(
          new FormData(e.currentTarget).entries(),
        )
        addPlayer(parse(PlayerSchema, player))
        navigate(`/rooms/${params.roomId}`)
      }}
    >
      <label htmlFor="name">
        Name
        <input type="text" name="name" placeholder="Name" />
      </label>
      <button type="submit">Add player</button>
    </form>
  )
}
