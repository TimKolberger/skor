import { generateRoomName } from './generate-room-name'
import { RoomNameInput } from './room-name-input'
import type { Room } from './use-rooms'
import { RoomSchema } from './use-rooms'
import { type ReactNode, useState } from 'react'
import { parse } from 'valibot'

type RoomFormProps = {
  initialValues?: Partial<Room>
  onSubmit: (values: Room) => void
  children: ReactNode
}
export const RoomForm = ({
  initialValues,
  onSubmit,
  children,
}: RoomFormProps) => {
  const [roomName, setRoomName] = useState(
    () => initialValues?.['name'] ?? generateRoomName(),
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const values = Object.fromEntries(new FormData(e.currentTarget))
        onSubmit(
          parse(RoomSchema, {
            ...initialValues,
            ...values,
          }),
        )
      }}
      className="flex flex-col gap-6 pb-10"
    >
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4">
        <RoomNameInput value={roomName} onChange={setRoomName} />
        {children}
      </div>
    </form>
  )
}
