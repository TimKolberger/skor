import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"
import { linker } from "../../navigation/linker"
import * as React from "react"
import { useMemo } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react"
import { LS_KEY_GAMES } from "../../persistence/localStorageKeys"
import { generateId } from "../../utils/generateId"
import { Game } from "../useGames"

export default function CreateGamePage() {
  const navigate = useNavigate()
  const gameId = useMemo(() => generateId(), [])

  useHotkeys("esc", () => navigate(linker.home()))

  return (
    <FullModalLayout to={linker.games()}>
      <Main py="8">
        <Stack
          gap="6"
          as="form"
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget
            // @ts-expect-error as prop => form
            const formData = new FormData(form)
            const data = Object.fromEntries(formData) as Omit<Game, "id">

            const games: Game[] = JSON.parse(
              localStorage.getItem(LS_KEY_GAMES) || "[]"
            )
            if (games.some((game) => game.id === gameId)) {
              return
            }
            const nextGames: Game[] = [{ ...data, id: gameId }, ...games]
            localStorage.setItem(LS_KEY_GAMES, JSON.stringify(nextGames))
            navigate(linker.game({ gameId }))
          }}
        >
          <Heading>Create Game</Heading>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" />
          </FormControl>

          <Button type="submit" variant="outline">
            Create game
          </Button>
        </Stack>
      </Main>
    </FullModalLayout>
  )
}
