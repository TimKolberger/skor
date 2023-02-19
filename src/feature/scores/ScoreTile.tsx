import {
  chakra,
  HTMLChakraProps,
  Icon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import { FiMinus, FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"

import type { ScoreSlice } from "../game/gameMachine"
import { useGameService } from "../game/useGameService"
import { linker } from "../navigation/linker"
import { ScoreDiff } from "./ScoreDiff"
import { TickingIconButton } from "./TickingIconButton"
import { Player } from "../players/usePlayers"
import { Game } from "../game/useGames"

export interface ConnectedScoreTileProps {
  game: Game
  player: Player
  scoreSlice: ScoreSlice
}

export const ConnectedScoreTile = ({
  game,
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
        game={game}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        player={player}
        scoreSlice={scoreSlice}
      />
    </chakra.div>
  )
}

export interface ScoreTileProps extends HTMLChakraProps<"div"> {
  game: Game
  onDecrement: () => void
  player: Player
  scoreSlice: ScoreSlice
  onIncrement: () => void
}

export const ScoreTile = ({
  game,
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
    userSelect="none"
    bg={player.color}
    {...boxProps}
  >
    <TickingIconButton
      icon={<Icon as={FiMinus} fontSize="4xl" />}
      aria-label="decrement score"
      onTick={onDecrement}
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
        to={linker.player({ gameId: game.id, playerId: player.id })}
        fontWeight="black"
        fontSize="3xl"
        textTransform="uppercase"
        textAlign="center"
        px="2"
      >
        {player.name}
      </LinkOverlay>
      <ScoreDiff scoreSlice={scoreSlice} />
    </LinkBox>
    <TickingIconButton
      icon={<Icon as={FiPlus} fontSize="4xl" />}
      aria-label="increment score"
      onTick={onIncrement}
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
