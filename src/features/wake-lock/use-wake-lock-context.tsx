import { WakeLockContext } from './wake-lock-context'
import { useContext } from 'react'

export const useWakeLockContext = () => {
  const context = useContext(WakeLockContext)
  if (!context) {
    throw new Error('useWakeLockContext must be used within a WakeLockProvider')
  }
  return context
}
