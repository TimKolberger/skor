import { DocumentContext } from './document-context.tsx'
import { type ReactNode } from 'react'
import * as Y from 'yjs'

type DocumentProviderProps = {
  children?: ReactNode
  doc: Y.Doc
}

export const DocumentProvider = ({ children, doc }: DocumentProviderProps) => (
  <DocumentContext.Provider value={doc}>{children}</DocumentContext.Provider>
)
