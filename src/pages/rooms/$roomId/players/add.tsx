import { Button } from '../../../../components/button'
import { playerColors } from '../../../../features/players/player-colors'
import { PlayerForm } from '../../../../features/players/player-form'
import { RoomProvider } from '../../../../features/rooms/room-provider'
import { useCurrentRoom } from '../../../../features/rooms/use-current-room'
import {
  PlayerSchema,
  usePlayers,
} from '../../../../features/rooms/use-players'
import type { LayoutProps } from '../../../../features/router/types'
import { HeaderMenu } from '../../../../layout/header-menu'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../../layout/layout'
import { type ReactNode, useState } from 'react'
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
      <AppLayoutHeader title="Add player" backLink={`/rooms/${room.id}`}>
        <HeaderMenu />
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
      <Button type="submit" className="" variant="primary">
        Add player
      </Button>
    </PlayerForm>
  )
}
