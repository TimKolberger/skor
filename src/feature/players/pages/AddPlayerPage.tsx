import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate, useParams } from "react-router-dom"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"
import { linker } from "../../navigation/linker"
import { playerColors } from "../ColorInput"
import { PlayerForm, PlayerFormValues } from "../PlayerForm"
import { usePlayers } from "../usePlayers"
import { generateId } from "../../utils/generateId"

export default function AddPlayerPage() {
  const navigate = useNavigate()
  const players = usePlayers()
  const { gameId } = useParams()
  const [playerColor, setPlayerColor] = useState(
    () => playerColors[Math.floor(Math.random() * playerColors.length)]
  )
  if (!gameId) throw new Error("Missing gameId")
  const gameUrl = linker.game({ gameId })
  useHotkeys("esc", () => navigate(gameUrl))

  const onSubmit = (player: PlayerFormValues) => {
    players.push([{ ...player, id: generateId() }])
    navigate(gameUrl)
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
