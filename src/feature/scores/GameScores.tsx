import {
  Center,
  chakra,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { AnimatePresence, LayoutGroup, Reorder } from "framer-motion"
import * as React from "react"
import { FiAward, FiUserPlus } from "react-icons/fi"
import { Link } from "react-router-dom"

import { useGame } from "../game/useGame"
import { useGameService } from "../game/useGameService"
import { linker } from "../navigation/linker"
import { noop } from "../utils/noop"
import { ConnectedScoreTile } from "./ScoreTile"
import { sortPlayersWithScore } from "./sortPlayersWithScore"
import { useGameScoresKeyboardShortcuts } from "./useGameScoresKeyboardShortcuts"

const ReorderGroup = chakra(Reorder.Group, {
  baseStyle: {
    listStyleType: "none",
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
  },
})

const ReorderItem = chakra(Reorder.Item, {
  baseStyle: {
    display: "flex",
    flex: "1 0 auto",
  },
})

export const GameScores = () => {
  const gameService = useGameService()
  const { players, scores, sort } = useGame()

  useGameScoresKeyboardShortcuts()

  React.useEffect(
    () => () => {
      gameService.send({ type: "IDLE" })
    },
    [gameService]
  )

  const sortedPlayersAndScores = React.useMemo(
    () =>
      sortPlayersWithScore({
        players,
        scores,
        sort,
      }),
    [players, scores, sort]
  )

  if (!sortedPlayersAndScores.length) {
    return <EmptyGameScoresScreen />
  }

  return (
    <LayoutGroup>
      <ReorderGroup axis="y" values={sortedPlayersAndScores} onReorder={noop}>
        <AnimatePresence>
          {sortedPlayersAndScores.map((value) => {
            const { player, scoreSlice } = value
            return (
              <ReorderItem
                key={player.id}
                value={value}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                drag={false}
              >
                <ConnectedScoreTile
                  player={player}
                  scoreSlice={scoreSlice}
                  key={`${player.id}${sort}`}
                />
              </ReorderItem>
            )
          })}
        </AnimatePresence>
      </ReorderGroup>
    </LayoutGroup>
  )
}

const EmptyGameScoresScreen = () => (
  <Center flex="1">
    <VStack spacing="8">
      <Icon as={FiAward} fontSize="8xl" />
      <Text fontSize="xl" maxW="60" textAlign="center" fontWeight="bold">
        Assemble your players to start the game
      </Text>
      <IconButton
        size="lg"
        fontSize="4xl"
        boxSize="20"
        icon={<Icon as={FiUserPlus} />}
        aria-label="Add player"
        as={Link}
        to={linker.addPlayer()}
      />
    </VStack>
  </Center>
)
