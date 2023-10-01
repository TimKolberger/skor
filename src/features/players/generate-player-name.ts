import { names } from './assets/player-names.json'

export function generatePlayerName() {
  return names[Math.floor(Math.random() * names.length)]
}
