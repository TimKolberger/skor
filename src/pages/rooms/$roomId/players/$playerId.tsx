import {
  Button,
  IconButton,
  IconButtonLink,
} from '../../../../components/button.tsx'
import { playerColors } from '../../../../features/players/player-colors.ts'
import { PlayerForm } from '../../../../features/players/player-form.tsx'
import { RoomProvider } from '../../../../features/rooms/room-provider.tsx'
import { useCurrentRoom } from '../../../../features/rooms/use-current-room.ts'
import { usePlayers } from '../../../../features/rooms/use-players.ts'
import type { LayoutProps } from '../../../../features/router/types.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../../layout/layout.tsx'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { FiChevronLeft, FiUserMinus } from 'react-icons/fi'
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
      <AppLayoutHeader title="Edit Player">
        <IconButtonLink to={`/rooms/${room.id}`}>
          <FiChevronLeft />
        </IconButtonLink>
        <IconButton
          onClick={() => {
            removePlayer(params.playerId!)
            navigate(`/rooms/${room.id}`)
          }}
        >
          <FiUserMinus />
        </IconButton>
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
    throw new Error(`Player ${params.playerId} not found`)
  }
  const [playerColor, setPlayerColor] = useState(
    () =>
      initialPlayer.color ||
      playerColors[Math.floor(Math.random() * playerColors.length)],
  )

  return (
    <PlayerForm
      onSubmit={(player) => {
        updatePlayer(player)
        navigate(`/rooms/${params.roomId}`)
      }}
      onColorChange={setPlayerColor}
      initialValues={{ ...initialPlayer, color: playerColor }}
    >
      <Button size="sm" type="submit" className="self-end" variant="primary">
        Save player
      </Button>
    </PlayerForm>
  )
}
