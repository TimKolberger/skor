import {
  chakra,
  FormControl,
  FormLabel,
  SimpleGrid,
  usePrevious,
} from "@chakra-ui/react"
import * as React from "react"
import { AudioPlayerProvider, useAudioPlayer } from "react-use-audio-player"

import { useMuted } from "../settings/useMuted"
import tune_a1 from "./assets/tunes/a1.mp3"
import tune_a from "./assets/tunes/a.mp3"
import tune_b1 from "./assets/tunes/b1.mp3"
import tune_b from "./assets/tunes/b.mp3"
import tune_c1 from "./assets/tunes/c1.mp3"
import tune_c2 from "./assets/tunes/c2.mp3"
import tune_c from "./assets/tunes/c.mp3"
import tune_cis1 from "./assets/tunes/cis1.mp3"
import tune_cis from "./assets/tunes/cis.mp3"
import tune_d1 from "./assets/tunes/d1.mp3"
import tune_d from "./assets/tunes/d.mp3"
import tune_e1 from "./assets/tunes/e1.mp3"
import tune_e from "./assets/tunes/e.mp3"
import tune_es1 from "./assets/tunes/es1.mp3"
import tune_es from "./assets/tunes/es.mp3"
import tune_f1 from "./assets/tunes/f1.mp3"
import tune_f from "./assets/tunes/f.mp3"
import tune_fis1 from "./assets/tunes/fis1.mp3"
import tune_fis from "./assets/tunes/fis.mp3"
import tune_g1 from "./assets/tunes/g1.mp3"
import tune_g from "./assets/tunes/g.mp3"
import tune_gis1 from "./assets/tunes/gis1.mp3"
import tune_gis from "./assets/tunes/gis.mp3"
import tune_h1 from "./assets/tunes/h1.mp3"
import tune_h from "./assets/tunes/h.mp3"

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

export const PlayerColorInput = (props: PlayerColorInputProps) => (
  <AudioPlayerProvider>
    <ColorInputComponent {...props} />
  </AudioPlayerProvider>
)

const ColorInputComponent = ({ value, onChange }: PlayerColorInputProps) => {
  const columns = 4
  const colorSelectRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    colorSelectRef.current?.focus()
  }, [])

  useAudioEffect(playerColors.indexOf(value))
  const id = React.useId()

  return (
    <FormControl>
      <FormLabel srOnly id={id}>
        Player color
      </FormLabel>
      <input
        aria-labelledby={id}
        type="hidden"
        name="playerColor"
        value={value}
      />
      <SimpleGrid
        aria-label="Color selection"
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
              aria-label={`Select player color ${color}`}
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

function useAudioEffect(index: number) {
  const [mute] = useMuted()
  const allSounds = [
    tune_a,
    tune_a1,
    tune_b,
    tune_b1,
    tune_c,
    tune_c1,
    tune_c2,
    tune_cis,
    tune_cis1,
    tune_d,
    tune_d1,
    tune_e,
    tune_e1,
    tune_es,
    tune_es1,
    tune_f,
    tune_f1,
    tune_fis,
    tune_fis1,
    tune_g,
    tune_g1,
    tune_gis,
    tune_gis1,
    tune_h,
    tune_h1,
  ]
  const src = allSounds[index % allSounds.length]

  const prev = usePrevious(index)
  const isFirstRender = prev === index

  return useAudioPlayer({
    src,
    format: "mp3",
    mute,
    autoplay: !mute || !isFirstRender,
  })
}
