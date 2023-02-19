import { useHotkeys } from "react-hotkeys-hook"
import { Link, useNavigate, useParams } from "react-router-dom"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"
import { linker } from "../../navigation/linker"
import { chakra, Icon, IconButton } from "@chakra-ui/react"
import { FiShare, FiUserPlus } from "react-icons/fi"
import * as React from "react"
import { useGames } from "../useGames"
import NotFoundPage from "../../navigation/pages/NotFoundPage"
import { GameScores } from "../../scores/GameScores"

export default function GamePage() {
  const navigate = useNavigate()
  useHotkeys("esc", () => navigate(linker.home()))

  const { games } = useGames()
  const { gameId } = useParams()
  const game = games.find((game) => game.id === gameId)

  if (!gameId || !game) return <NotFoundPage />

  return (
    <FullModalLayout
      actionButtons={
        <>
          <chakra.li>
            <IconButton
              as={Link}
              to={linker.addPlayer({ gameId })}
              variant="ghost"
              fontSize="2xl"
              icon={<Icon as={FiUserPlus} />}
              aria-label="AddPlayerPage User"
            />
          </chakra.li>
          <chakra.li>
            <IconButton
              as={Link}
              to={linker.shareGame({ gameId: game.id })}
              variant="ghost"
              fontSize="2xl"
              icon={<Icon as={FiShare} fontSize="2xl" />}
              aria-label="Share game"
            />
          </chakra.li>
        </>
      }
    >
      <Main px="0">
        <GameScores />
      </Main>
    </FullModalLayout>
  )
}
