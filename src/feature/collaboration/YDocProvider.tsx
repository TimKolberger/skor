import React, { useMemo } from "react"
import * as Y from "yjs"

export const DocumentContext = React.createContext<Y.Doc | null>(null)

interface DocumentProviderProps {
  children: React.ReactNode
  doc: Y.Doc
  folderName?: string
  documentName?: string
}

export const DocumentProvider = ({ children, doc }: DocumentProviderProps) => (
  <DocumentContext.Provider value={doc}>{children}</DocumentContext.Provider>
)

export function useDoc() {
  const doc = React.useContext(DocumentContext)

  if (!doc) {
    throw new Error(
      "Could not retrieve a document. Please wrap in a DocumentProvider."
    )
  }

  return doc
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSharedType = <T extends Y.AbstractType<any>>(
  ...args: Parameters<Y.Doc["get"]>
) => {
  const doc = useDoc()
  const [name, typeConstr] = args
  const thing = useMemo(
    () => doc.get(name, typeConstr) as T,
    [doc, name, typeConstr]
  )

  const forceUpdate = useForceUpdate()
  React.useEffect(() => {
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

export const useMap = <T,>(name: string) => {
  const map = useSharedType<Y.Map<T>>(name, Y.Map)

  return {
    ymap: map,
    state: map.toJSON(),
    get: React.useCallback((name: string) => map.get(name), [map]),
    set: React.useCallback(
      (name: string, value: T) => map.set(name, value),
      [map]
    ),
  }
}

export const useArray = <T,>(name: string) => {
  const array = useSharedType<Y.Array<T>>(name, Y.Array)

  return {
    yarray: array,
    state: array.toJSON(),
    get: React.useCallback((index: number) => array.get(index), [array]),
    insert: React.useCallback(
      (index: number, content: T[]) => array.insert(index, content),
      [array]
    ),
    delete: React.useCallback(
      (index: number, length: number) => array.delete(index, length),
      [array]
    ),
    push: React.useCallback((content: T[]) => array.push(content), [array]),
    unshift: React.useCallback(
      (content: T[]) => array.unshift(content),
      [array]
    ),
    slice: React.useCallback(
      (start: number, end: number) => array.slice(start, end),
      [array]
    ),
  }
}

export const useForceUpdate = () => {
  const [, dispatch] = React.useReducer((s) => s + 1, 0)
  return dispatch
}
