import { IconButton, IconButtonProps, useLatestRef } from "@chakra-ui/react"
import * as React from "react"
import { useCallback, useEffect } from "react"

interface TickingIconButtonProps extends IconButtonProps {
  onTick: () => void
}

export const TickingIconButton = ({
  onTick,
  ...props
}: TickingIconButtonProps) => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const initialDurationBetweenTicks = 500
  const shortestDurationBetweenTicks = 50
  const decrementDurationWithEachTickBy = 50

  const msRef = React.useRef(initialDurationBetweenTicks)

  const onTickRef = useLatestRef(onTick)
  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      onTickRef.current()
      msRef.current = Math.max(
        shortestDurationBetweenTicks,
        msRef.current - decrementDurationWithEachTickBy
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

  return (
    <IconButton
      {...props}
      onPointerLeave={clearTimer}
      onPointerUp={clearTimer}
      onBlur={clearTimer}
      onPointerDown={startTimer}
      onClick={() => {
        clearTimer()
        onTick()
      }}
    />
  )
}
