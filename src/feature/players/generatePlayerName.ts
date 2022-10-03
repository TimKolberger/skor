import { names } from "./playerNames.json"

export function generatePlayerName() {
  return names[Math.floor(Math.random() * names.length)]
}
