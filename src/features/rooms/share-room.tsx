import { IconButton } from '../../components/button.tsx'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '../../components/drawer.tsx'
import type { Room } from './use-rooms.ts'
import { useMemo } from 'react'
import { FiCopy, FiShare } from 'react-icons/fi'
import QRCode from 'react-qr-code'

export function ShareRoom({ room }: { room: Room }) {
  const shareRoomUrlString = useMemo(() => {
    const joinRoomUrl = new URL(`/rooms/${room.id}/join`, window.origin)
    joinRoomUrl.searchParams.set('name', room.name)
    return joinRoomUrl.toString()
  }, [room.id, room.name])

  const shareData = {
    title: 'SK0R',
    text: `Join my SK0R room "${room.name}" to play card games!`,
    url: shareRoomUrlString,
  }

  const isShareAvailable = typeof navigator.share === 'function'

  return (
    <Drawer>
      <DrawerTrigger>
        <IconButton>
          <FiShare />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <h1 className="mb-4 text-center text-2xl font-bold">
          Share room "{room.name}"
        </h1>
        <div className="stack gap-4">
          <p>
            Collaborate with your companions by sharing this room. You can
            update and view the game stats in real-time.
          </p>
          {isShareAvailable ? (
            <div>
              <button
                onClick={async () => {
                  await navigator.share(shareData)
                }}
              >
                Share via System Share Capabilities
              </button>
            </div>
          ) : null}

          <div className="flex flex-col self-stretch">
            <div className="flex justify-center">
              <QRCode
                size={256}
                height="auto"
                width="100%"
                value={shareRoomUrlString}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>

          <div>
            <p>Old school by URL: </p>
            <div className="flex">
              <a
                href={shareRoomUrlString}
                className="inline-block whitespace-break-spaces break-all"
              >
                {shareRoomUrlString}
              </a>
              {typeof navigator.clipboard?.writeText === 'function' ? (
                <IconButton
                  onClick={async () => {
                    await navigator.clipboard.writeText(shareRoomUrlString)
                  }}
                >
                  <FiCopy />
                </IconButton>
              ) : null}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
