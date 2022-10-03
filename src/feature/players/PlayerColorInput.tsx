import {
  chakra,
  FormControl,
  FormLabel,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react"
import * as React from "react"

export const playerColors = [
  "gray.600",
  "red.600",
  "orange.600",
  "amber.600",
  "yellow.600",
  "lime.600",
  "green.600",
  "emerald.600",
  "teal.600",
  "cyan.600",
  "sky.600",
  "blue.600",
  "indigo.600",
  "violet.600",
  "pink.600",
  "rose.600",
]

interface PlayerColorInputProps {
  value: string
  onChange: (value: string) => void
}

export const PlayerColorInput = ({
  value,
  onChange,
}: PlayerColorInputProps) => {
  const columns = useBreakpointValue({ base: 2, md: 4 }) ?? 2
  const colorSelectRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    colorSelectRef.current?.focus()
  }, [])

  return (
    <FormControl>
      <FormLabel srOnly>Player color</FormLabel>
      <input type="hidden" name="playerColor" value={value} />
      <SimpleGrid
        ref={colorSelectRef}
        columns={columns}
        tabIndex={0}
        _focus={{ outline: "none" }}
        overflow="hidden"
        pb="4"
        onKeyDown={(e) => {
          const currentIndex = playerColors.findIndex(
            (color) => value === color
          )
          const length = playerColors.length
          const maxIndex = playerColors.length - 1

          const keyHandlerMap: Record<string, () => void> = {
            ArrowLeft: () => {
              let nextIndex = (currentIndex - 1) % length
              if (nextIndex < 0) {
                nextIndex = maxIndex
              }
              const nextColor = playerColors[nextIndex]
              onChange(nextColor)
            },
            ArrowRight: () => {
              let nextIndex = (currentIndex + 1) % length
              if (nextIndex < 0) {
                nextIndex = maxIndex
              }
              const nextColor = playerColors[nextIndex]
              onChange(nextColor)
            },
            ArrowUp: () => {
              let nextIndex = (currentIndex - columns) % length
              if (nextIndex < 0) {
                nextIndex += maxIndex + 1
              }
              const nextColor = playerColors[nextIndex]
              onChange(nextColor)
            },
            ArrowDown: () => {
              let nextIndex = (currentIndex + columns) % length
              if (nextIndex < 0) {
                nextIndex += maxIndex - 1
              }
              const nextColor = playerColors[nextIndex]
              onChange(nextColor)
            },
          }
          keyHandlerMap[e.key]?.()
        }}
      >
        {playerColors.map((color) => {
          const isSelected = value === color
          return (
            <chakra.div
              key={color}
              bg={color}
              h="20"
              flex="1 1 auto"
              flexBasis="20"
              transform="auto"
              scale={isSelected ? "1.2" : "1"}
              zIndex={isSelected ? 1 : 0}
              onClick={() => onChange(color)}
              boxShadow="md"
              transitionProperty="common"
              transitionDuration="fast"
              transitionTimingFunction="ease-out"
            />
          )
        })}
      </SimpleGrid>
    </FormControl>
  )
}
