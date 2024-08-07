import { renderHook } from '../../../test/utils'
import { useWakeLockContext } from './use-wake-lock-context'
import { WakeLockProvider } from './wake-lock-provider'
import { expect } from 'vitest'

describe('Wake Lock', () => {
  it('should request wake lock', async () => {
    const { result } = renderHook(() => useWakeLockContext(), {
      wrapper: ({ children }) => (
        <WakeLockProvider>{children}</WakeLockProvider>
      ),
    })
    expect(result.current.isSupported).toBe(false)
  })

  it('should require a context provider', async () => {
    expect(() =>
      renderHook(() => useWakeLockContext()),
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: useWakeLockContext must be used within a WakeLockProvider]`,
    )
  })
})
