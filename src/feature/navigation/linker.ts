import { createLinker } from "./createLinker"

export const linker = createLinker({
  home: "/",

  addPlayer: "/players/add",
  editPlayer: "/players/:playerId/edit",
  playerScore: "/players/:playerId",

  setScores: "/players/set-scores",

  settings: "/settings",
} as const)
