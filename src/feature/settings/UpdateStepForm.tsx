import { FormControl, FormLabel } from "@chakra-ui/react"
import * as React from "react"

import { MobileFriendlyNumberInput } from "../formFields/MobileFriendlyNumberInput"
import { useGame } from "../game/useGame"
import { useGameService } from "../game/useGameService"

export const UpdateStepForm = () => {
  const gameService = useGameService()
  const game = useGame()

  return (
    <FormControl>
      <FormLabel>Increase score with each tick by</FormLabel>
      <MobileFriendlyNumberInput
        value={game.step}
        onChange={(step) => gameService.send({ type: "SET_STEP", step })}
      />
    </FormControl>
  )
}
