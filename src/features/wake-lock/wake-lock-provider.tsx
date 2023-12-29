import { WakeLockContext } from './wake-lock-context.tsx'
import { type ReactNode, useMemo } from 'react'
import { useWakeLock } from 'react-screen-wake-lock'

export const WakeLockProvider = ({ children }: { children: ReactNode }) => {
  const { isSupported, released, request, release, type } = useWakeLock()

  const value = useMemo(
    () => ({ isSupported, released, request, release, type }),
    [isSupported, released, request, release, type],
  )

  return (
    <WakeLockContext.Provider value={value}>
      {children}
    </WakeLockContext.Provider>
  )
}
