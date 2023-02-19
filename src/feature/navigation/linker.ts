import { createLinker } from "./createLinker"

export const linker = createLinker({
  home: "/",

  games: "/games",
  game: "/games/:gameId",
  addGame: "/games/add",
  shareGame: "/games/:gameId/share",
  joinGame: "/games/:gameId/join",

  addPlayer: "/games/:gameId/players/add",
  editPlayer: "/games/:gameId/players/:playerId/edit",
  player: "/games/:gameId/players/:playerId",

  setScores: "/games/:gameId/players/set-scores",

  settings: "/settings",
  legalNotice: "/legal-notice",

  githubRepo: "https://github.com/TimKolberger/skor",
})
