import { createContext } from 'react'
import { useWakeLock } from 'react-screen-wake-lock'

export const WakeLockContext = createContext<ReturnType<
  typeof useWakeLock
> | null>(null)
