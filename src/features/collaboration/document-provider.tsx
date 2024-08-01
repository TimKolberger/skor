import { DocumentContext } from './document-context'
import { type ReactNode } from 'react'
import { Doc } from 'yjs'

type DocumentProviderProps = {
  children?: ReactNode
  doc: Doc
}

export const DocumentProvider = ({ children, doc }: DocumentProviderProps) => (
  <DocumentContext.Provider value={doc}>{children}</DocumentContext.Provider>
)
