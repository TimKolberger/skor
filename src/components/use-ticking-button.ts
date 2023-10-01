import { useCallback, useEffect, useRef } from 'react'

export function useTickingButton({ onTick }: { onTick: () => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const initialDurationBetweenTicks = 500
  const shortestDurationBetweenTicks = 50
  const decrementDurationWithEachTickBy = 50

  const msRef = useRef(initialDurationBetweenTicks)

  const onTickRef = useLatestRef(onTick)
  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      onTickRef.current()
      msRef.current = Math.max(
        shortestDurationBetweenTicks,
        msRef.current - decrementDurationWithEachTickBy,
      )
      startTimer()
    }, msRef.current)
  }
  const clearTimer = useCallback(() => {
    clearTimeout(timerRef.current)
    msRef.current = initialDurationBetweenTicks
  }, [])

  useEffect(() => {
    return () => {
      // stop ticking when component unmounts
      clearTimer()
    }
  }, [clearTimer])

  return {
    onPointerLeave: clearTimer,
    onPointerUp: clearTimer,
    onBlur: clearTimer,
    onPointerDown: startTimer,
    onClick: () => {
      clearTimer()
      onTick()
    },
  }
}

function useLatestRef<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}
