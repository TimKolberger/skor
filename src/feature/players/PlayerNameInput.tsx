import {
  chakra,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { FiShuffle, FiX } from "react-icons/fi"

import { generatePlayerName } from "./generatePlayerName"

interface PlayerNameInputProps {
  value: string
  onChange: (playerName: string) => void
}

export const PlayerNameInput = ({ value, onChange }: PlayerNameInputProps) => (
  <FormControl>
    <FormLabel>Player name</FormLabel>
    <chakra.div display="flex" gap="3">
      <InputGroup size="lg" variant="filled">
        <Input
          placeholder="e.g. John Doe"
          required
          name="playerName"
          value={value}
          onChange={({ currentTarget: { value } }) => onChange(value)}
        />
        <InputRightElement>
          <IconButton
            size="sm"
            aria-label="Clear"
            icon={<Icon as={FiX} fontSize="xl" />}
            variant="ghost"
            onClick={() => onChange("")}
          />
        </InputRightElement>
      </InputGroup>
      <IconButton
        size="lg"
        aria-label="Generate player name"
        icon={<FiShuffle />}
        onClick={() => onChange(generatePlayerName())}
      />
    </chakra.div>
  </FormControl>
)
