import * as React from "react"

export function useLocalStorage<State>(
  storageKey: string,
  initialState: State | (() => State)
) {
  const [value, setValue] = React.useState<State>(
    JSON.parse(localStorage.getItem(storageKey) || "null") ?? initialState
  )

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue] as const
}
