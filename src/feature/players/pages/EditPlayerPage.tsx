import { Button, ButtonGroup, chakra, Icon, IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { FiChevronLeft } from "react-icons/fi"
import { useMatch, useNavigate } from "react-router-dom"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"
import { linker } from "../../navigation/linker"
import NotFoundPage from "../../navigation/pages/NotFoundPage"
import { playerColors } from "../ColorInput"
import { PlayerForm, PlayerFormValues } from "../PlayerForm"
import { RemovePlayer } from "../RemovePlayer"
import { usePlayers } from "../usePlayers"
import { usePlayerService } from "../usePlayerService"

export default function EditPlayerPage() {
  const navigate = useNavigate()
  const { players } = usePlayers()
  const match = useMatch(linker.editPlayer.definition)
  const player = players.find((p) => p.id === match?.params.playerId)
  const playerService = usePlayerService()
  const [playerColor, setPlayerColor] = useState(
    () =>
      player?.color ||
      playerColors[Math.floor(Math.random() * playerColors.length)]
  )

  useHotkeys("esc", () => navigate(linker.home()))

  if (!player) {
    return <NotFoundPage />
  }

  const onSubmit = (values: PlayerFormValues) => {
    playerService.send({
      type: "UPDATE_PLAYER",
      player: { ...player, ...values },
    })
    navigate(linker.home())
  }

  return (
    <FullModalLayout
      actionButtons={
        <>
          <chakra.li>
            <RemovePlayer
              player={player}
              onRemove={() => navigate(linker.home())}
            />
          </chakra.li>
          <chakra.li>
            <IconButton
              onClick={() => navigate(-1)}
              variant="ghost"
              fontSize="2xl"
              icon={<Icon as={FiChevronLeft} fontSize="2xl" />}
              aria-label="Back"
            />
          </chakra.li>
        </>
      }
    >
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
          initialValues={{ ...player, color: playerColor }}
        >
          <ButtonGroup
            justifyContent="flex-start"
            flexDirection="row-reverse"
            flexWrap="wrap"
            gap="3"
          >
            <Button type="submit" variant="outline">
              Save player
            </Button>
          </ButtonGroup>
        </PlayerForm>
      </Main>
    </FullModalLayout>
  )
}
