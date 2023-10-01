import { DocumentProvider } from '../collaboration/document-provider.tsx'
import { useCurrentRoom } from './use-current-room.ts'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { IndexeddbPersistence } from 'y-indexeddb'
// @ts-expect-error - not sure why TS cannot find types
import { WebrtcProvider } from 'y-webrtc'
import { Doc } from 'yjs'

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const room = useCurrentRoom()

  const [doc, setDoc] = useState<Doc>()
  const [error, setError] = useState<Error>()
  const webrtcProviderRef = useRef<WebrtcProvider>()
  const indexeddbPersistenceRef = useRef<IndexeddbPersistence>()

  useEffect(() => {
    const yDoc = new Doc()
    const docName = `cardscore:${room.id}`
    webrtcProviderRef.current = new WebrtcProvider(docName, yDoc, {
      signaling: ['wss://signaling.kolberger.eu/'],
    })
    indexeddbPersistenceRef.current = new IndexeddbPersistence(docName, yDoc)

    Promise.all([
      indexeddbPersistenceRef.current?.whenSynced,
      webrtcProviderRef.current?.whenSynced,
    ])
      .then(() => {
        setDoc(yDoc)
      })
      .catch((error) => {
        setError(error)
      })

    return () => {
      if (webrtcProviderRef.current?.connected) {
        webrtcProviderRef.current?.disconnect()
      }
      webrtcProviderRef.current?.destroy()
      indexeddbPersistenceRef.current?.destroy()
      yDoc?.destroy()
    }
  }, [room.id])

  if (error) {
    throw error
  }

  if (!doc) {
    return <p>Loading...</p>
  }

  return <DocumentProvider doc={doc}>{children}</DocumentProvider>
}
