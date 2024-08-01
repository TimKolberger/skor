import { createUniqueId } from '../../utils/create-unique-id'
import { LS_KEY_ROOMS } from '../persistence/local-storage-keys'
import { type InferOutput, object, pipe, transform, unknown } from 'valibot'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const RoomSchema = object({
  id: pipe(
    unknown(),
    transform((id) => {
      if (id) return String(id)
      return createUniqueId()
    }),
  ),
  name: pipe(
    unknown(),
    transform((name) => {
      if (name) return String(name)
      return 'Unnamed Room'
    }),
  ),
  createdAt: pipe(
    unknown(),
    transform((value) => {
      if (value) return String(value)
      return new Date().toISOString()
    }),
  ),
  updatedAt: pipe(
    unknown(),
    transform((value) => {
      if (value) return String(value)
      return new Date().toISOString()
    }),
  ),
})

export type Room = InferOutput<typeof RoomSchema>

export const useRoomStore = create(
  persist<{
    rooms: Room[]
    addRoom: (room: Omit<Room, 'createdAt' | 'updatedAt'>) => void
    editRoom: (room: Room) => void
    removeRoom: (id: string) => void
  }>(
    (set, get) => ({
      rooms: [],
      addRoom: (roomData) => {
        const rooms = get().rooms
        if (rooms.some((r) => r.id === roomData.id)) {
          return
        }
        const room = {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...roomData,
        }
        set({
          rooms: [...rooms, room],
        })
      },
      editRoom: (roomData) => {
        set({
          rooms: get().rooms.map((room) =>
            room.id === roomData.id
              ? { ...room, ...roomData, updatedAt: new Date().toISOString() }
              : room,
          ),
        })
      },
      removeRoom: (id) => {
        set({
          rooms: get().rooms.filter((room) => room.id !== id),
        })
      },
    }),
    {
      name: LS_KEY_ROOMS,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
