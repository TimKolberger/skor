import { SS_KEY_LAST_DIFF } from '../../persistence/session-storage-keys.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useLastDiff = create(
  persist<{
    diff: number
    setDiff: (nextDiff: number) => void
  }>(
    (set, get) => ({
      diff: 1,
      setDiff: (nextDiff) => set({ diff: nextDiff || get().diff }),
    }),
    {
      name: SS_KEY_LAST_DIFF,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
