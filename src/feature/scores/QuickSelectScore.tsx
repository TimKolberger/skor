import { Button, ButtonProps } from "@chakra-ui/react"
import * as React from "react"

export const SetScore = ({
  diff,
  onChange,
  currentValue,
  ...props
}: Omit<ButtonProps, "onChange"> & {
  diff: number
  currentValue?: number
  onChange: (value: number) => void
}) => (
  <Button
    onClick={() => {
      onChange(diff)
    }}
    size="sm"
    variant={currentValue === diff ? "solid" : "ghost"}
    {...props}
  >
    {diff}
  </Button>
)
