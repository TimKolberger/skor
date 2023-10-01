import { places } from './assets/room-names.json'

export function generateRoomName() {
  return places[Math.floor(Math.random() * places.length)]
}
