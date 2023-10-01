import { createContext } from 'react'
import * as Y from 'yjs'

export const DocumentContext = createContext<Y.Doc | null>(null)
