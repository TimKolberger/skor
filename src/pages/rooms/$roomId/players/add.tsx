import { Button, IconButtonLink } from '../../../../components/button.tsx'
import { PlayerForm } from '../../../../features/players/PlayerForm.tsx'
import { playerColors } from '../../../../features/players/playerColors.ts'
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
import { useState } from 'react'
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
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}
export default function AddPlayerPage() {
  const navigate = useNavigate()
  const params = useParams<{ roomId: string }>()
  const { addPlayer } = usePlayers()
  const [playerColor, setPlayerColor] = useState(
    () => playerColors[Math.floor(Math.random() * playerColors.length)],
  )

  return (
    <PlayerForm
      onSubmit={(player) => {
        addPlayer(parse(PlayerSchema, player))
        navigate(`/rooms/${params.roomId}`)
      }}
      onColorChange={setPlayerColor}
      initialValues={{ color: playerColor }}
    >
      <Button size="sm" type="submit" className="self-end" variant="primary">
        Add player
      </Button>
    </PlayerForm>
  )
}
