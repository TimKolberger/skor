import { useMap } from '../collaboration/y-doc-provider.tsx'

export type SortDirection = 'asc' | 'desc'

export function useSettings() {
  const { ymap, state, set } = useMap<unknown>('settings')
  const sortDirection = (state.sortDirection as SortDirection) || 'desc'
  return {
    ymap,
    sortDirection,
    setSortDirection: (dir: SortDirection) => set('sortDirection', dir),
  }
}
