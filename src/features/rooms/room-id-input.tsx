import { IconButton } from '../../components/button.tsx'
import { useRef } from 'react'
import { FiX } from 'react-icons/fi'

type RoomIdInputProps = {
  value?: string
  onChange?: (playerName: string) => void
}

export const RoomIdInput = ({ value, onChange }: RoomIdInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <label className="flex flex-col gap-1">
      Room Id (optional)
      <div className="flex flex-1 items-center rounded bg-slate-200 bg-opacity-10 py-1 pl-4 pr-1">
        <input
          placeholder="e.g. some-room-name"
          pattern="\w+-\w+-\w+"
          name="id"
          value={value}
          onChange={({ currentTarget: { value } }) => onChange?.(value)}
          className="flex-1 bg-transparent placeholder:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent"
          ref={inputRef}
        />
        <IconButton
          size="sm"
          aria-label="Clear"
          variant="ghost"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = ''
            }
            onChange?.('')
          }}
        >
          <FiX className="text-xl" />
        </IconButton>
      </div>
    </label>
  )
}
