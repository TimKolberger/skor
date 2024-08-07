import { Button, IconButton } from '../../../../../components/button'
import { playerColors } from '../../../../../features/players/player-colors'
import { PlayerForm } from '../../../../../features/players/player-form'
import { RoomProvider } from '../../../../../features/rooms/room-provider'
import { useCurrentRoom } from '../../../../../features/rooms/use-current-room'
import { usePlayers } from '../../../../../features/rooms/use-players'
import { notFound } from '../../../../../features/router/not-found-error'
import type { LayoutProps } from '../../../../../features/router/types'
import { HeaderMenu } from '../../../../../layout/header-menu'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../../../layout/layout'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <RoomProvider>
      <PageLayout>{children}</PageLayout>
    </RoomProvider>
  )
}

const PageLayout = ({ children }: { children: ReactNode }) => {
  const room = useCurrentRoom()
  const navigate = useNavigate()
  const params = useParams<{ playerId: string }>()
  const { removePlayer } = usePlayers()

  return (
    <AppLayout>
      <AppLayoutHeader
        title="Edit player"
        backLink={`/rooms/${room.id}/players/${params.playerId}`}
      >
        <IconButton
          onClick={() => {
            if (!params.playerId) return
            removePlayer(params.playerId)
            navigate(`/rooms/${room.id}`)
          }}
        >
          <FiTrash2 />
        </IconButton>
        <HeaderMenu />
      </AppLayoutHeader>
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}
export default function EditPlayerPage() {
  const navigate = useNavigate()
  const params = useParams<{ roomId: string; playerId: string }>()
  const { players, updatePlayer } = usePlayers()
  const initialPlayer = players.find((p) => p.id === params.playerId)
  if (!initialPlayer) {
    throw notFound(`Player "${params.playerId}" not found`)
  }
  const [playerColor, setPlayerColor] = useState(() => {
    const randomPlayerColor =
      playerColors[Math.floor(Math.random() * playerColors.length)]
    return initialPlayer.color || randomPlayerColor
  })

  return (
    <PlayerForm
      onSubmit={(player) => {
        updatePlayer(player)
        navigate(`/rooms/${params.roomId}`)
      }}
      onColorChange={setPlayerColor}
      initialValues={{ ...initialPlayer, color: playerColor }}
    >
      <Button type="submit" variant="primary">
        Save player
      </Button>
    </PlayerForm>
  )
}
