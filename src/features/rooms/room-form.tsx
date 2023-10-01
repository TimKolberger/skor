import { generateRoomName } from './generate-room-name.ts'
import { RoomNameInput } from './room-name-input.tsx'
import { RoomSchema } from './use-rooms.ts'
import type { Room } from './use-rooms.ts'
import * as React from 'react'
import { useState } from 'react'
import { parse } from 'valibot'

type RoomFormProps = {
  initialValues?: Partial<Room>
  onSubmit: (values: Room) => void
  children: React.ReactNode
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
        onSubmit(
          parse(RoomSchema, {
            ...initialValues,
            name: roomName,
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
