import { IconButton } from '../../components/button.tsx'
import { useTickingButton } from '../../components/use-ticking-button.ts'
import { useCurrentRoom } from './use-current-room.ts'
import { type Player, usePlayers } from './use-players.ts'
import { clsx } from 'clsx'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const Game = () => {
  const { players } = usePlayers()
  return (
    <>
      {Object.entries(players).map(([id, player]) => (
        <PlayerTile key={id} player={player} />
      ))}
    </>
  )
}
const PlayerTile = ({ player }: { player: Player }) => {
  const room = useCurrentRoom()
  const { updatePlayer } = usePlayers()
  return (
    <div
      className={clsx('flex flex-1 select-none shadow', {
        'bg-cyan-600': player.score === 0,
        'bg-green-600': player.score > 0,
        'bg-red-600': player.score < 0,
      })}
    >
      <IconButton
        className="min-h-full min-w-[4rem] rounded-none"
        size="lg"
        {...useTickingButton({
          onTick: () =>
            updatePlayer({ id: player.id, score: (player.score || 0) - 1 }),
        })}
      >
        <FiMinus />
      </IconButton>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <Link
          to={`/rooms/${room.id}/players/${player.id}`}
          className={clsx(
            'px-2 text-center text-3xl font-black uppercase',
            'before:absolute before:inset-0 before:bg-transparent before:transition-all before:hover:bg-slate-600 before:hover:bg-opacity-10 before:focus-visible:bg-slate-100 before:active:bg-opacity-5',
          )}
        >
          {player.name}
        </Link>
        <div className="px-2 text-center text-5xl font-black tabular-nums leading-tight">
          {player.score}
        </div>
      </div>
      <IconButton
        className="min-h-full min-w-[4rem] rounded-none"
        size="lg"
        {...useTickingButton({
          onTick: () =>
            updatePlayer({ id: player.id, score: (player.score || 0) + 1 }),
        })}
      >
        <FiPlus />
      </IconButton>
    </div>
  )
}
