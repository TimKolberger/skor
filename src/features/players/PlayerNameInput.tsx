import { IconButton } from '../../components/button.tsx'
import { generatePlayerName } from './generatePlayerName.ts'
import { FiShuffle, FiX } from 'react-icons/fi'

interface PlayerNameInputProps {
  value: string
  onChange: (playerName: string) => void
}

export const PlayerNameInput = ({ value, onChange }: PlayerNameInputProps) => (
  <div>
    <label className="flex flex-col gap-1">
      Player name
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded bg-slate-200 bg-opacity-10 py-1 pl-4 pr-1">
          <input
            placeholder="e.g. John Doe"
            required
            name="playerName"
            value={value}
            onChange={({ currentTarget: { value } }) => onChange(value)}
            className="bg-transparent placeholder:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent"
          />
          <IconButton
            size="sm"
            aria-label="Clear"
            variant="ghost"
            onClick={() => onChange('')}
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
  </div>
)
