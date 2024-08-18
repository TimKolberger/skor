import { SS_KEY_LAST_DIFF } from '../../persistence/session-storage-keys'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useLastDiff = create(
  persist<{
    diff: number
    setDiff: (nextDiff: number) => void
  }>(
    (set) => ({
      diff: 1,
      setDiff: (nextDiff) => set({ diff: nextDiff }),
    }),
    {
      name: SS_KEY_LAST_DIFF,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
