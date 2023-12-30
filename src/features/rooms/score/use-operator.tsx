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
      name: 'calc-mode',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
