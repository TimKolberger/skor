import {
  chakra,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import * as React from "react"

import { SetScore } from "./QuickSelectScore"

export interface UpdateScoreFormFieldProps {
  value?: number
  onChange: (value: number) => void
}

export function UpdateScoreFormField({
  value,
  onChange,
}: UpdateScoreFormFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const input = (
    <NumberInput
      name="score"
      size="lg"
      value={value}
      onChange={(_, value) => onChange?.(value)}
      variant="filled"
    >
      <NumberInputField
        ref={inputRef}
        fontSize="7xl"
        height="auto"
        textAlign="center"
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )

  return (
    <>
      <chakra.div display="flex" gap="6" flexDirection="column">
        <FormControl>
          <FormLabel>Value</FormLabel>
          {input}
        </FormControl>

        <chakra.div display="flex" gap="2" flexWrap="wrap">
          <SetScore currentValue={value} diff={0} onChange={onChange} />
          <SetScore currentValue={value} diff={1} onChange={onChange} />
          <SetScore currentValue={value} diff={2} onChange={onChange} />
          <SetScore currentValue={value} diff={3} onChange={onChange} />
          <SetScore currentValue={value} diff={4} onChange={onChange} />
          <SetScore currentValue={value} diff={5} onChange={onChange} />
          <SetScore currentValue={value} diff={10} onChange={onChange} />
          <SetScore currentValue={value} diff={20} onChange={onChange} />
          <SetScore currentValue={value} diff={50} onChange={onChange} />
          <SetScore currentValue={value} diff={100} onChange={onChange} />
          <SetScore currentValue={value} diff={300} onChange={onChange} />
          <SetScore currentValue={value} diff={500} onChange={onChange} />
          <SetScore currentValue={value} diff={1000} onChange={onChange} />
        </chakra.div>
      </chakra.div>
    </>
  )
}
