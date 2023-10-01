import { useDoc } from './use-doc.tsx'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { Doc, Map, Array, type AbstractType } from 'yjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSharedType = function <T extends AbstractType<any>>(
  ...args: Parameters<Doc['get']>
) {
  const doc = useDoc()
  const [name, typeConstr] = args
  const thing = useMemo(
    () => doc.get(name, typeConstr) as T,
    [doc, name, typeConstr],
  )

  const forceUpdate = useForceUpdate()
  useEffect(() => {
    const update = () => {
      forceUpdate()
    }
    thing.observe(update)
    return () => {
      thing.unobserve(update)
    }
  }, [forceUpdate, thing])

  return thing
}

export const useMap = function <T>(name: string) {
  const map = useSharedType<Map<T>>(name, Map)

  return {
    ymap: map,
    state: map.toJSON() as Record<string, T>,
    get: useCallback((name: string) => map.get(name), [map]),
    set: useCallback((name: string, value: T) => map.set(name, value), [map]),
    remove: useCallback((name: string) => map.delete(name), [map]),
  }
}

export function useArray<T>(name: string) {
  const array = useSharedType<Array<T>>(name, Array)

  return {
    yarray: array,
    state: array.toJSON(),
    get: useCallback((index: number) => array.get(index), [array]),
    insert: useCallback(
      (index: number, content: T[]) => array.insert(index, content),
      [array],
    ),
    remove: useCallback(
      (index: number, length: number) => array.delete(index, length),
      [array],
    ),
    push: useCallback((content: T[]) => array.push(content), [array]),
    unshift: useCallback((content: T[]) => array.unshift(content), [array]),
    slice: useCallback(
      (start: number, end: number) => array.slice(start, end),
      [array],
    ),
  }
}

const useForceUpdate = function () {
  const [, dispatch] = useReducer((s) => s + 1, 0)
  return dispatch
}
