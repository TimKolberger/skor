import { Button, IconButton } from '../../components/button.tsx'
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
        <div className="stack mx-auto max-w-2xl gap-10">
          <p>
            Collaborate with your companions by sharing this room. You can
            update and view the game stats in real-time.
          </p>
          {isShareAvailable ? (
            <div className="flex w-full justify-center">
              <Button
                variant="primary"
                className="border-slate-600"
                onClick={async () => {
                  await navigator.share(shareData)
                }}
              >
                <FiShare />
                Share
              </Button>
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
            <p>or you can share this URL</p>
            <div className="flex gap-2">
              <code className="border-1 inline-flex select-all items-center whitespace-break-spaces break-all rounded border-slate-400 bg-slate-200 px-2 py-1">
                {shareRoomUrlString}
              </code>
              {typeof navigator.clipboard?.writeText === 'function' ? (
                <IconButton
                  size="sm"
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
