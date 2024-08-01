import { IconButton } from '../../components/button'
import { generateRoomName } from './generate-room-name'
import { FiShuffle, FiX } from 'react-icons/fi'

interface RoomNameInputProps {
  value?: string
  onChange?: (playerName: string) => void
}

export const RoomNameInput = ({ value, onChange }: RoomNameInputProps) => (
  <label className="flex flex-col gap-1">
    Room name
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center rounded bg-slate-200 bg-opacity-10 py-1 pl-4 pr-1">
        <input
          placeholder="e.g. Chamber of Secrets"
          required
          name="name"
          value={value}
          onChange={({ currentTarget: { value } }) => onChange?.(value)}
          className="flex-1 bg-transparent placeholder:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent"
        />
        <IconButton
          size="sm"
          aria-label="Clear"
          variant="ghost"
          onClick={() => onChange?.('')}
        >
          <FiX className="text-xl" />
        </IconButton>
      </div>
      <IconButton
        aria-label="Generate room name"
        onClick={() => onChange?.(generateRoomName())}
      >
        <FiShuffle />
      </IconButton>
    </div>
  </label>
)
