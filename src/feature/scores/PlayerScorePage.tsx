import { chakra, Container, Heading, Icon, IconButton } from "@chakra-ui/react"
import * as React from "react"
import { FiUser } from "react-icons/fi"
import { Link, useMatch } from "react-router-dom"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import NotFoundPage from "../linker/NotFoundPage"
import { linker } from "../linker/linker"
import { usePlayers } from "../players/usePlayers"
import { ConnectedScoreForm } from "./ScoreForm"

export default function PlayerScorePage() {
  const { players } = usePlayers()
  const match = useMatch(linker.playerScore.definition)
  const player = players.find((p) => p.id === match?.params.playerId)

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
      <Container
        display="flex"
        flexDirection="column"
        flex="1"
        gap="12"
        py="10"
      >
        <Heading textAlign="center" size="4xl" textTransform="uppercase">
          {player.name}
        </Heading>
        <ConnectedScoreForm player={player} />
      </Container>
    </FullModalLayout>
  )
}
