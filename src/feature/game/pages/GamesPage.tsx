import { Main } from "../../../layouts/Main"
import { AppLayout } from "../../../layouts/AppLayout"
import { Box, chakra, Icon, IconButton } from "@chakra-ui/react"
import { FiPlus, FiTrash2 } from "react-icons/fi"
import * as React from "react"
import { Link } from "react-router-dom"
import { linker } from "../../navigation/linker"
import { useGames } from "../useGames"
import { Header } from "../../../layouts/Header"

export const GamesPage = () => {
  const { games, setGames } = useGames()
  return (
    <AppLayout>
      <Header
        actionButtons={
          <>
            <chakra.li>
              <IconButton
                onClick={() => {
                  setGames([])
                }}
                variant="ghost"
                fontSize="2xl"
                icon={<Icon as={FiTrash2} fontSize="2xl" />}
                aria-label={`Clear all games`}
              />
            </chakra.li>
            <chakra.li>
              <IconButton
                as={Link}
                to={linker.addGame()}
                variant="ghost"
                fontSize="2xl"
                icon={<Icon as={FiPlus} fontSize="2xl" />}
                aria-label={`Add game`}
              />
            </chakra.li>
          </>
        }
      />
      <Main py="0" px="0">
        <chakra.ul listStyleType="none">
          {games.map((game) => (
            <chakra.li
              key={game.id}
              px="4"
              py="6"
              shadow="md"
              bg="whiteAlpha.100"
              position="relative"
            >
              <Box
                as={Link}
                to={linker.game({ gameId: game.id })}
                fontSize="2xl"
                _before={{
                  content: '""',
                  position: "absolute",
                  display: "block",
                  inset: 0,
                }}
              >
                Join {game.name}
              </Box>
            </chakra.li>
          ))}
        </chakra.ul>
      </Main>
    </AppLayout>
  )
}

export default GamesPage
