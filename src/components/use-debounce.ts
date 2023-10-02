import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export function useDebounce<S>(
  value: S,
  delay?: number,
): [S, Dispatch<SetStateAction<S>>] {
  const [debouncedValue, setDebouncedValue] = useState<S>(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
    timerRef.current = timer
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return [
    debouncedValue,
    useCallback(
      (v) => {
        clearTimeout(timerRef.current)
        setDebouncedValue(v)
      },
      [timerRef],
    ),
  ]
}
