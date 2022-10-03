import {
  chakra,
  FormControl,
  FormLabel,
  IconButton,
  Input,
} from "@chakra-ui/react"
import * as React from "react"
import { FiShuffle } from "react-icons/fi"

import { generatePlayerName } from "./generatePlayerName"

interface PlayerNameInputProps {
  value: string
  onChange: (playerName: string) => void
}

export const PlayerNameInput = ({ value, onChange }: PlayerNameInputProps) => (
  <FormControl>
    <FormLabel>Player name</FormLabel>
    <chakra.div display="flex" gap="3">
      <Input
        variant="filled"
        placeholder="e.g. John Doe"
        required
        name="playerName"
        value={value}
        onChange={({ currentTarget: { value } }) => onChange(value)}
      />
      <IconButton
        aria-label="Generate player name"
        icon={<FiShuffle />}
        onClick={() => onChange(generatePlayerName())}
      />
    </chakra.div>
  </FormControl>
)
