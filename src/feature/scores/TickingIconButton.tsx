import { IconButton, IconButtonProps, useLatestRef } from "@chakra-ui/react"
import * as React from "react"

interface TickingIconButtonProps extends IconButtonProps {
  onTick: () => void
}

export const TickingIconButton = ({
  onTick,
  ...props
}: TickingIconButtonProps) => {
  const timerRef = React.useRef<any>(null)
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
  const clearTimer = () => {
    msRef.current = initialDurationBetweenTicks
    clearInterval(timerRef.current)
  }
  return (
    <IconButton
      {...props}
      onPointerLeave={clearTimer}
      onPointerUp={clearTimer}
      onPointerDown={startTimer}
      onClick={onTick}
    />
  )
}
