import { SS_KEY_CALC_MODE } from '../../persistence/session-storage-keys.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Operator = 'add' | 'subtract' | 'set'
export const useOperator = create(
  persist<{
    operator: Operator
    setOperator: (operator: Operator) => void
  }>(
    (set, get) => ({
      operator: 'add',
      setOperator: (operator) => set({ operator: operator || get().operator }),
    }),
    {
      name: SS_KEY_CALC_MODE,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
