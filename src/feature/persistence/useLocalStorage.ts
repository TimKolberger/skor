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

  React.useEffect(() => {
    const listener = (event: StorageEvent) => {
      if (event.key === storageKey) {
        setValue(JSON.parse(event.newValue || "null") ?? initialState)
      }
    }
    window.addEventListener("storage", listener)
    return () => {
      window.removeEventListener("storage", listener)
    }
  }, [storageKey, initialState])

  return [value, setValue] as const
}
