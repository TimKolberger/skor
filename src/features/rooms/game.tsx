import { ButtonLink, IconButton } from '../../components/button'
import { IconContainer } from '../../components/icon-container'
import { useDebounce } from '../../components/use-debounce'
import { useTickingButton } from '../../components/use-ticking-button'
import { useCurrentRoom } from './use-current-room'
import { DEBOUNCE_DELAY, type PlayerWithScore, usePlayers } from './use-players'
import { clsx } from 'clsx'
import { AnimatePresence, LayoutGroup, Reorder } from 'framer-motion'
import { FiMinus, FiPlus, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const Game = () => {
  const { players } = usePlayers()
  if (!players.length) {
    return <EmptyGame />
  }

  return (
    <LayoutGroup>
      <Reorder.Group
        axis="y"
        values={players}
        onReorder={() => void 0}
        // @ts-expect-error - invalid Framer/React 19 types
        className="flex flex-1 flex-col"
      >
        <AnimatePresence>
          {players.map((player) => {
            return (
              <Reorder.Item
                key={player.id}
                value={player}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                drag={false}
                // @ts-expect-error - invalid Framer/React 19 types
                className="flex flex-1"
              >
                <PlayerTile player={player} />
              </Reorder.Item>
            )
          })}
        </AnimatePresence>
      </Reorder.Group>
    </LayoutGroup>
  )
}

function EmptyGame() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <IconContainer>
        <FiUsers />
      </IconContainer>
      <p className="text-center text-2xl font-black">There are no players.</p>
      <ButtonLink to="players/add" variant="primary">
        Create player
      </ButtonLink>
    </div>
  )
}

const PlayerTile = ({ player }: { player: PlayerWithScore }) => {
  const room = useCurrentRoom()
  const { updateScore } = usePlayers()
  const score = player.score || 0
  const [debouncedScore] = useDebounce(score, DEBOUNCE_DELAY)

  const diff = score - debouncedScore
  const scoreView =
    diff !== 0
      ? `${debouncedScore} ${diff >= 0 ? '+' : '-'} ${Math.abs(diff)}`
      : score

  return (
    <div className={clsx('flex flex-1 select-none shadow', player.color)}>
      <IconButton
        className="min-h-full min-w-16 rounded-none"
        size="lg"
        {...useTickingButton({
          onTick: () => updateScore(player.id, -1),
        })}
      >
        <FiMinus />
      </IconButton>
      <div className="relative flex flex-1 flex-col items-center justify-center py-4">
        <Link
          to={`/rooms/${room.id}/players/${player.id}`}
          className={clsx(
            'px-2 text-center text-3xl font-black uppercase',
            'before:absolute before:inset-0 before:transition-all',
            'before:bg-slate-200 before:bg-opacity-0',
            'before:hover:bg-opacity-10 before:focus-visible:bg-opacity-10 before:active:bg-opacity-15',
          )}
        >
          {player.name}
        </Link>
        <div className="break-all px-2 text-center text-5xl font-black tabular-nums leading-tight">
          {scoreView}
        </div>
      </div>
      <IconButton
        className="min-h-full min-w-16 rounded-none"
        size="lg"
        {...useTickingButton({
          onTick: () => updateScore(player.id, 1),
        })}
      >
        <FiPlus />
      </IconButton>
    </div>
  )
}
