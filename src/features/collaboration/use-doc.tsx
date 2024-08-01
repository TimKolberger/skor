import { DocumentContext } from './document-context'
import { useContext } from 'react'

export function useDoc() {
  const doc = useContext(DocumentContext)

  if (!doc) {
    throw new Error(
      'Could not retrieve a document. Please wrap in a DocumentProvider.',
    )
  }

  return doc
}
