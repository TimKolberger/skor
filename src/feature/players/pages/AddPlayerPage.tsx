import { Button } from "@chakra-ui/react"
import * as React from "react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"
import { linker } from "../../navigation/linker"
import { playerColors } from "../PlayerColorInput"
import { PlayerForm, PlayerFormValues } from "../PlayerForm"
import { usePlayerService } from "../usePlayerService"

export default function AddPlayerPage() {
  const navigate = useNavigate()
  const playerService = usePlayerService()
  const [playerColor, setPlayerColor] = useState(
    () => playerColors[Math.floor(Math.random() * playerColors.length)]
  )

  useHotkeys("esc", () => navigate(linker.home()))

  const onSubmit = (player: PlayerFormValues) => {
    playerService.send({ type: "ADD_PLAYER", player })
    navigate("/")
  }

  return (
    <FullModalLayout>
      <Main
        px="0"
        bg={playerColor}
        transitionProperty="common"
        transitionDuration="fast"
        transitionTimingFunction="ease-out"
      >
        <PlayerForm
          onSubmit={onSubmit}
          onColorChange={setPlayerColor}
          initialValues={{ color: playerColor }}
        >
          <Button
            size="lg"
            type="submit"
            alignSelf="flex-end"
            variant="outline"
          >
            Add player
          </Button>
        </PlayerForm>
      </Main>
    </FullModalLayout>
  )
}
