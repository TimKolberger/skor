import tune_a1 from './assets/tunes/a1.mp3'
import tune_a from './assets/tunes/a.mp3'
import tune_b1 from './assets/tunes/b1.mp3'
import tune_b from './assets/tunes/b.mp3'
import tune_c1 from './assets/tunes/c1.mp3'
import tune_c2 from './assets/tunes/c2.mp3'
import tune_c from './assets/tunes/c.mp3'
import tune_cis1 from './assets/tunes/cis1.mp3'
import tune_cis from './assets/tunes/cis.mp3'
import tune_d1 from './assets/tunes/d1.mp3'
import tune_d from './assets/tunes/d.mp3'
import tune_e1 from './assets/tunes/e1.mp3'
import tune_e from './assets/tunes/e.mp3'
import tune_es1 from './assets/tunes/es1.mp3'
import tune_es from './assets/tunes/es.mp3'
import tune_f1 from './assets/tunes/f1.mp3'
import tune_f from './assets/tunes/f.mp3'
import tune_fis1 from './assets/tunes/fis1.mp3'
import tune_fis from './assets/tunes/fis.mp3'
import tune_g1 from './assets/tunes/g1.mp3'
import tune_g from './assets/tunes/g.mp3'
import tune_gis1 from './assets/tunes/gis1.mp3'
import tune_gis from './assets/tunes/gis.mp3'
import tune_h1 from './assets/tunes/h1.mp3'
import tune_h from './assets/tunes/h.mp3'
import { playerColors } from './player-colors.ts'
import { clsx } from 'clsx'
import * as React from 'react'

export interface ColorInputProps {
  value: string
  onChange: (value: string) => void
}

export const ColorInput = ({ value, onChange }: ColorInputProps) => {
  const columns = 4
  const colorSelectRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    colorSelectRef.current?.focus()
  }, [])
  const playIndex = useAudioEffect()
  const id = React.useId()

  const handleChange = (value: string) => {
    playIndex(playerColors.indexOf(value))
    onChange(value)
  }

  return (
    <div>
      <label id={id} className="sr-only">
        Player color
      </label>
      <input
        aria-labelledby={id}
        type="hidden"
        name="playerColor"
        value={value}
      />
      <div
        aria-label="Color selection"
        ref={colorSelectRef}
        tabIndex={0}
        className={`grid grid-cols-4 overflow-hidden pb-4 focus:ring-0`}
        onKeyDown={(e) => {
          const currentIndex = playerColors.findIndex(
            (color) => value === color,
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
              handleChange(nextColor)
            },
            ArrowRight: () => {
              let nextIndex = (currentIndex + 1) % length
              if (nextIndex < 0) {
                nextIndex = maxIndex
              }
              const nextColor = playerColors[nextIndex]
              handleChange(nextColor)
            },
            ArrowUp: () => {
              let nextIndex = (currentIndex - columns) % length
              if (nextIndex < 0) {
                nextIndex += maxIndex + 1
              }
              const nextColor = playerColors[nextIndex]
              handleChange(nextColor)
            },
            ArrowDown: () => {
              let nextIndex = (currentIndex + columns) % length
              if (nextIndex < 0) {
                nextIndex += maxIndex - 1
              }
              const nextColor = playerColors[nextIndex]
              handleChange(nextColor)
            },
          }
          keyHandlerMap[e.key]?.()
        }}
      >
        {playerColors.map((color) => {
          const isSelected = value === color
          return (
            <div
              key={color}
              aria-label={`Select player color ${color}`}
              className={clsx(
                'h-20 flex-1 basis-20 shadow transition-all',
                {
                  'z-1 scale-125 rounded': isSelected,
                },
                color,
              )}
              onClick={() => handleChange(color)}
            />
          )
        })}
      </div>
    </div>
  )
}

function useAudioEffect() {
  return useMultiAudio(
    [
      tune_a1,
      tune_a,
      tune_b1,
      tune_b,
      tune_c1,
      tune_c2,
      tune_c,
      tune_cis1,
      tune_cis,
      tune_d1,
      tune_d,
      tune_e1,
      tune_e,
      tune_es1,
      tune_es,
      tune_f1,
      tune_f,
      tune_fis1,
      tune_fis,
      tune_g1,
      tune_g,
      tune_gis1,
      tune_gis,
      tune_h1,
      tune_h,
    ],
    { mute: false },
  )
}

function useMultiAudio(urls: string[], options?: { mute?: boolean }) {
  return async function play(targetIndex: number) {
    if (options?.mute) {
      return
    }
    const url = urls[targetIndex % urls.length]
    const audio = new Audio(url)
    await audio.play()
  }
}
