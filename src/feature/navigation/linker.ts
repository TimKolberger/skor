import { createLinker } from "./createLinker"

export const linker = createLinker({
  home: "/",

  gamesOverview: "/games",

  addPlayer: "/players/add",
  editPlayer: "/players/:playerId/edit",
  playerScore: "/players/:playerId",

  setScores: "/players/set-scores",

  settings: "/settings",
  legalNotice: "/legal-notice",

  githubRepo: "https://github.com/TimKolberger/skor",
})
