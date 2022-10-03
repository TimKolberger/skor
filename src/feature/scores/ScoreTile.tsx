import {
  chakra,
  HTMLChakraProps,
  Icon,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import * as React from "react"
import { FiMinus, FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"

import type { ScoreSlice } from "../game/gameMachine"
import { useGameService } from "../game/useGameService"
import { linker } from "../linker/linker"
import { Player } from "../players/playerMachine"

export interface ConnectedScoreTileProps {
  player: Player
  scoreSlice: ScoreSlice
}

export const ConnectedScoreTile = ({
  player,
  scoreSlice,
}: ConnectedScoreTileProps) => {
  const gameService = useGameService()

  const onIncrement = () => {
    gameService.send({ type: "INCREMENT", playerId: player.id })
  }

  const onDecrement = () => {
    gameService.send({ type: "DECREMENT", playerId: player.id })
  }

  return (
    <chakra.div flex="1 0 0" display="flex" alignItems="stretch">
      <ScoreTile
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        player={player}
        scoreSlice={scoreSlice}
      />
    </chakra.div>
  )
}

interface ScoreTileProps extends HTMLChakraProps<"div"> {
  onDecrement: () => void
  player: Player
  scoreSlice: ScoreSlice
  onIncrement: () => void
}

const ScoreTile = ({
  onDecrement,
  player,
  scoreSlice,
  onIncrement,
  ...boxProps
}: ScoreTileProps) => (
  <chakra.div
    position="relative"
    flex="1 0 0"
    display="flex"
    alignItems="stretch"
    boxShadow="md"
    bg={player.color}
    {...boxProps}
  >
    <IconButton
      icon={<Icon as={FiMinus} fontSize="4xl" />}
      aria-label="decrement score"
      onClick={onDecrement}
      alignSelf="stretch"
      h="auto"
      borderRadius="none"
      variant="ghost"
      minW="16"
      display="flex"
      flexShrink="0"
    />
    <LinkBox
      flex="1 0 0"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="4"
      py="4"
    >
      <LinkOverlay
        as={Link}
        to={linker.playerScore({ playerId: player.id })}
        fontWeight="black"
        fontSize="3xl"
        textTransform="uppercase"
        textAlign="center"
        px="2"
      >
        {player.name}
      </LinkOverlay>
      <Text fontWeight="black" fontSize="3xl">
        {scoreSlice.total + scoreSlice.diff}
      </Text>
    </LinkBox>
    <IconButton
      icon={<Icon as={FiPlus} fontSize="4xl" />}
      aria-label="increment score"
      onClick={onIncrement}
      alignSelf="stretch"
      h="auto"
      borderRadius="none"
      variant="ghost"
      minW="16"
      display="flex"
      flexShrink="0"
    />
  </chakra.div>
)
