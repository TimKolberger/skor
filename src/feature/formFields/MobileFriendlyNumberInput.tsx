import {
  chakra,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"
import * as React from "react"
import { FiMinus, FiPlus } from "react-icons/fi"

export interface MobileFriendlyNumberInputProps {
  value?: number
  onChange: (value: number) => void
}

export function MobileFriendlyNumberInput({
  value,
  onChange,
}: MobileFriendlyNumberInputProps) {
  const input = (
    <NumberInput
      name="score"
      size="lg"
      value={value}
      onChange={(_, value) => onChange?.(value)}
      variant="filled"
    >
      <InputGroup fontSize="7xl">
        <InputLeftElement h="20" bg="whiteAlpha.100">
          <NumberDecrementStepper
            h="full"
            w="full"
            border="none"
            fontSize="2xl"
          >
            <Icon as={FiMinus} />
          </NumberDecrementStepper>
        </InputLeftElement>

        <NumberInputField
          height="20"
          textAlign="center"
          fontWeight="bold"
          fontSize="4xl"
        />

        <InputRightElement h="20" bg="whiteAlpha.100">
          <NumberIncrementStepper
            h="full"
            w="full"
            border="none"
            fontSize="2xl"
          >
            <Icon as={FiPlus} />
          </NumberIncrementStepper>
        </InputRightElement>
      </InputGroup>
    </NumberInput>
  )

  return (
    <chakra.div display="flex" gap="6" flexDirection="column">
      <FormControl>
        <FormLabel srOnly>Score</FormLabel>
        {input}
      </FormControl>
    </chakra.div>
  )
}
