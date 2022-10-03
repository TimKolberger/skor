import * as React from "react"

import { PlayerServiceContext } from "./PlayerProvider"

export function usePlayerService() {
  return React.useContext(PlayerServiceContext)
}
