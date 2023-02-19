import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"
import { linker } from "../../navigation/linker"
import { Button, Heading, VStack } from "@chakra-ui/react"
import * as React from "react"
import { useGames } from "../useGames"
import NotFoundPage from "../../navigation/pages/NotFoundPage"
import { useEffect } from "react"

export default function JoinGamePage() {
  const navigate = useNavigate()
  useHotkeys("esc", () => navigate(linker.home()))

  return (
    <FullModalLayout to={linker.games()}>
      <Main py="8">
        <JoinGame />
      </Main>
    </FullModalLayout>
  )
}

const JoinGame = () => {
  const [searchParams] = useSearchParams()
  const { games, setGames } = useGames()
  const navigate = useNavigate()
  const { gameId } = useParams()

  useEffect(() => {
    if (!gameId || !games.some((g) => g.id === gameId)) return
    navigate(linker.game({ gameId }))
  })

  if (!gameId) return <NotFoundPage />

  const name = searchParams.get("name") ?? "Unknown"
  const createdAt = searchParams.get("createdAt") ?? new Date().toISOString()

  return (
    <>
      <VStack spacing="8">
        <Heading>Join game {name}</Heading>
        <Button
          onClick={() => {
            setGames((games) => {
              const existingGame = games.find((game) => game.id === gameId)
              if (existingGame) return games
              return [...games, { id: gameId, name, createdAt }]
            })
          }}
        >
          Join {name}
        </Button>
      </VStack>
    </>
  )
}
