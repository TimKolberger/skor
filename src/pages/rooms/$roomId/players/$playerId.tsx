import { RoomProvider } from '../../../../features/rooms/room-provider.tsx'
import { usePlayers } from '../../../../features/rooms/use-players.ts'
import type { LayoutProps } from '../../../../features/router/types.ts'
import { useNavigate, useParams } from 'react-router-dom'

export const Layout = ({ children }: LayoutProps) => {
  return <RoomProvider>{children}</RoomProvider>
}

export default function EditPlayerPage() {
  const { playerId, roomId } = useParams()
  const navigate = useNavigate()
  if (!playerId) {
    throw new Error('Missing playerId')
  }

  const { removePlayer } = usePlayers()
  return (
    <>
      <button
        onClick={() => {
          removePlayer(playerId)
          navigate(`/rooms/${roomId}`)
        }}
      >
        Remove
      </button>
    </>
  )
}
