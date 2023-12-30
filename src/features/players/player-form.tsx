import type { Player } from '../rooms/use-players.ts'
import { PlayerSchema } from '../rooms/use-players.ts'
import { ColorInput } from './color-input.tsx'
import { generatePlayerName } from './generate-player-name.ts'
import { playerColors } from './player-colors.ts'
import { PlayerNameInput } from './player-name-input.tsx'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { parse } from 'valibot'

type PlayerFormProps = {
  initialValues?: Partial<Player>
  onSubmit: (values: Player) => void
  onColorChange?: (color: Player['color']) => void
  children: React.ReactNode
}
export const PlayerForm = ({
  initialValues,
  onSubmit,
  onColorChange,
  children,
}: PlayerFormProps) => {
  const [playerColor, setPlayerColor] = useState(
    () =>
      initialValues?.['color'] ??
      playerColors[Math.floor(Math.random() * playerColors.length)],
  )
  const [playerName, setPlayerName] = useState(
    () => initialValues?.['name'] ?? generatePlayerName(),
  )

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(
          parse(PlayerSchema, {
            ...initialValues,
            name: playerName,
            color: playerColor,
          }),
        )
      }}
      className="flex flex-col gap-6 pb-10"
    >
      <ColorInput
        value={playerColor}
        onChange={(nextValue) => {
          setPlayerColor(nextValue)
          onColorChange?.(nextValue)
        }}
      />
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4">
        <PlayerNameInput
          value={playerName}
          onChange={setPlayerName}
          ref={inputRef}
        />
        {children}
      </div>
    </form>
  )
}
