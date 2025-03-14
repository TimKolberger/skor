import { LoadingScreen } from '../../components/loading-screen'
import { DocumentProvider } from '../collaboration/document-provider'
import { useCurrentRoom } from './use-current-room'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { IndexeddbPersistence } from 'y-indexeddb'
import { WebrtcProvider } from 'y-webrtc'
import { Doc } from 'yjs'

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const room = useCurrentRoom()

  const [doc, setDoc] = useState<Doc>()
  const [error, setError] = useState<Error>()
  const webrtcProviderRef = useRef<WebrtcProvider>(null)
  const indexeddbPersistenceRef = useRef<IndexeddbPersistence>(null)

  useEffect(() => {
    const yDoc = new Doc()
    const docName = `cardscore:${room.id}`
    webrtcProviderRef.current = new WebrtcProvider(docName, yDoc, {
      signaling: ['wss://signaling.kolberger.eu/'],
    })
    indexeddbPersistenceRef.current = new IndexeddbPersistence(docName, yDoc)

    indexeddbPersistenceRef.current.whenSynced
      .then(() => {
        setDoc(yDoc)
      })
      .catch((error) => {
        setError(error)
      })

    const syncedListener = () => {
      yDoc.emit('sync', [true, yDoc])
    }

    webrtcProviderRef.current?.on('synced', syncedListener)

    return () => {
      webrtcProviderRef.current?.off('synced', syncedListener)
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
    return <LoadingScreen />
  }

  return <DocumentProvider doc={doc}>{children}</DocumentProvider>
}
