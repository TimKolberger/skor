import { createContext } from 'react'
import { Doc } from 'yjs'

export const DocumentContext = createContext<Doc | null>(null)
