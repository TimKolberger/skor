import { Button } from '../../../../components/button.tsx'
import { playerColors } from '../../../../features/players/player-colors.ts'
import { PlayerForm } from '../../../../features/players/player-form.tsx'
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
      <AppLayoutHeader title="Add player" backLink={`/rooms/${room.id}`} />
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
      <Button type="submit" className="" variant="primary">
        Add player
      </Button>
    </PlayerForm>
  )
}
