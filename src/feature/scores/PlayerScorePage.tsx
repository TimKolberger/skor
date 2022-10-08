import { chakra, Container, Heading, Icon, IconButton } from "@chakra-ui/react"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { FiUser } from "react-icons/fi"
import { Link, useMatch, useNavigate } from "react-router-dom"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import NotFoundPage from "../navigation/NotFoundPage"
import { linker } from "../navigation/linker"
import { RemovePlayer } from "../players/RemovePlayer"
import { usePlayers } from "../players/usePlayers"
import { ConnectedScoreForm } from "./ScoreForm"

export default function PlayerScorePage() {
  const { players } = usePlayers()
  const match = useMatch(linker.playerScore.definition)
  const player = players.find((p) => p.id === match?.params.playerId)
  const navigate = useNavigate()

  useHotkeys("esc", () => navigate(linker.home()))

  if (!player) {
    return <NotFoundPage />
  }

  return (
    <FullModalLayout
      to={linker.home()}
      bg={player.color}
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
              as={Link}
              to={linker.editPlayer({ playerId: player.id })}
              variant="ghost"
              fontSize="2xl"
              icon={<Icon as={FiUser} fontSize="2xl" />}
              aria-label={`Edit ${player.name}`}
            />
          </chakra.li>
        </>
      }
    >
      <Container display="flex" flexDirection="column" flex="1" gap="8" py="10">
        <Heading textAlign="center" size="4xl" textTransform="uppercase">
          {player.name}
        </Heading>
        <ConnectedScoreForm player={player} />
      </Container>
    </FullModalLayout>
  )
}
