import { Switch } from "@chakra-ui/react"
import * as React from "react"

import { useMuted } from "./useMuted"

export const MuteSwitch = () => {
  const [muted, setMuted] = useMuted()

  return (
    <Switch
      isChecked={muted}
      onChange={(e) => setMuted(e.currentTarget.checked)}
      display="flex"
      alignItems="center"
    >
      Mute application sounds
    </Switch>
  )
}
