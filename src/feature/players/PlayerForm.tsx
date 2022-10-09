import { chakra, Container } from "@chakra-ui/react"
import * as React from "react"
import { useState } from "react"

import { ColorInput, playerColors } from "./ColorInput"
import { PlayerNameInput } from "./PlayerNameInput"
import { generatePlayerName } from "./generatePlayerName"

export interface PlayerFormValues {
  name: string
  color: string
}

type PlayerFormProps = {
  initialValues?: Partial<PlayerFormValues>
  onSubmit: (values: PlayerFormValues) => void
  onColorChange?: (color: PlayerFormValues["color"]) => void
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
      initialValues?.["color"] ??
      playerColors[Math.floor(Math.random() * playerColors.length)]
  )
  const [playerName, setPlayerName] = useState(
    () => initialValues?.["name"] ?? generatePlayerName()
  )

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name: playerName, color: playerColor })
      }}
      display="flex"
      flexDirection="column"
      gap="6"
      pb="10"
    >
      <ColorInput
        value={playerColor}
        onChange={(nextValue) => {
          setPlayerColor(nextValue)
          onColorChange?.(nextValue)
        }}
      />
      <Container display="flex" flexDirection="column" gap="6">
        <PlayerNameInput value={playerName} onChange={setPlayerName} />
        {children}
      </Container>
    </chakra.form>
  )
}
