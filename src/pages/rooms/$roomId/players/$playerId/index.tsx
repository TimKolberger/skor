import {
  IconButton,
  IconButtonLink,
} from '../../../../../components/button.tsx'
import { RoomProvider } from '../../../../../features/rooms/room-provider.tsx'
import { ScoreForm } from '../../../../../features/rooms/score/score-form.tsx'
import { useCurrentRoom } from '../../../../../features/rooms/use-current-room.ts'
import { usePlayers } from '../../../../../features/rooms/use-players.ts'
import type { LayoutProps } from '../../../../../features/router/types.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../../../../layout/layout.tsx'
import { clsx } from 'clsx'
import { type ReactNode } from 'react'
import { FiChevronLeft, FiEdit, FiTrash2 } from 'react-icons/fi'
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
      <AppLayoutHeader title="Edit Score">
        <IconButtonLink to={`/rooms/${room.id}`}>
          <FiChevronLeft />
        </IconButtonLink>
        <IconButtonLink
          to={`/rooms/${room.id}/players/${params.playerId}/edit`}
        >
          <FiEdit />
        </IconButtonLink>
        <IconButton
          onClick={() => {
            removePlayer(params.playerId!)
            navigate(`/rooms/${room.id}`)
          }}
        >
          <FiTrash2 />
        </IconButton>
      </AppLayoutHeader>
      <AppLayoutContent variant="full-size">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function PlayerPage() {
  const navigate = useNavigate()
  const params = useParams<{ roomId: string; playerId: string }>()
  const { players, updateScore } = usePlayers()
  const player = players.find((p) => p.id === params.playerId)
  if (!player) {
    throw new Error(`Player ${params.playerId} not found`)
  }

  return (
    <div
      className={clsx(
        player.color,
        'flex flex-1 flex-col items-center gap-8 px-6 py-12',
      )}
    >
      <h1 className="text-center text-5xl font-black uppercase">
        {player.name}
      </h1>
      <ScoreForm
        score={player.score}
        onSubmit={(values) => {
          updateScore(player.id, values.diff)
          navigate(`/rooms/${params.roomId}`)
        }}
        className="flex w-full max-w-md flex-1 flex-col gap-6"
      />
    </div>
  )
}
