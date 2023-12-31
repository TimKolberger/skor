import { IconButton } from '../../components/button.tsx'
import { generatePlayerName } from './generate-player-name.ts'
import { forwardRef } from 'react'
import { FiShuffle, FiX } from 'react-icons/fi'

interface PlayerNameInputProps {
  value: string
  onChange: (playerName: string) => void
}

export const PlayerNameInput = forwardRef<
  HTMLInputElement,
  PlayerNameInputProps
>((props, ref) => {
  const { value, onChange } = props
  return (
    <label className="flex flex-col gap-1">
      Player name
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center rounded bg-slate-200 bg-opacity-10 py-1 pl-4 pr-1">
          <input
            placeholder="e.g. John Doe"
            required
            name="name"
            value={value}
            onChange={({ currentTarget: { value } }) => onChange(value)}
            className="flex-1 bg-transparent placeholder:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent"
            ref={ref}
            autoComplete="off"
            inputMode="text"
          />
          <IconButton
            size="sm"
            aria-label="Clear"
            variant="ghost"
            onClick={() => onChange('')}
            className="ml-auto"
          >
            <FiX className="text-xl" />
          </IconButton>
        </div>
        <IconButton
          aria-label="Generate player name"
          onClick={() => onChange(generatePlayerName())}
        >
          <FiShuffle />
        </IconButton>
      </div>
    </label>
  )
})

PlayerNameInput.displayName = 'PlayerNameInput'
