import * as React from "react"

import { GameServiceContext } from "./GameProvider"

export function useGameService() {
  return React.useContext(GameServiceContext)
}
