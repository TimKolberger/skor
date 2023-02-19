import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate, useParams } from "react-router-dom"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"
import { linker } from "../../navigation/linker"
import {
  Box,
  Button,
  chakra,
  Code,
  Heading,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import * as React from "react"
import QRCode from "react-qr-code"
import { Game, useGames } from "../useGames"
import NotFoundPage from "../../navigation/pages/NotFoundPage"

export default function ShareGamePage() {
  const navigate = useNavigate()
  useHotkeys("esc", () => navigate(linker.home()))

  const { games } = useGames()
  const { gameId } = useParams()
  const game = games.find((game) => game.id === gameId)

  if (!gameId || !game) return <NotFoundPage />

  return (
    <FullModalLayout to={linker.game({ gameId })}>
      <Main py="8">
        <ShareGame game={game} />
      </Main>
    </FullModalLayout>
  )
}

function useShareGameLink(game: Game) {
  const joinGameUrl = new URL(
    linker.joinGame({ gameId: game.id }),
    window.location.origin
  )
  joinGameUrl.searchParams.set("name", game.name)
  return joinGameUrl.toString()
}

const ShareGame = ({ game }: { game: Game }) => {
  const joinGameHref = useShareGameLink(game)
  const toast = useToast()

  const canShare = typeof navigator.share === "function"

  return (
    <>
      <VStack spacing="8">
        <Heading>Share this game</Heading>
        <Stack>
          <Text fontSize="xl">{game.name}</Text>
          <Text fontSize="lg">{new Date(game.createdAt).toLocaleString()}</Text>
        </Stack>
        <Text>Scan the QR code to join:</Text>
        <chakra.div
          height="auto"
          margin="0 auto"
          maxWidth="64"
          width="100%"
          p="3"
          bg="white"
          borderRadius="md"
        >
          <Box
            as={QRCode}
            size={256}
            height="auto"
            maxWidth="100%"
            width="100%"
            value={joinGameHref}
            viewBox={`0 0 256 256`}
          />
        </chakra.div>

        <Text>or send them the URL some other way:</Text>

        <Code textAlign="center" wordBreak="break-word" p="3" userSelect="all">
          {joinGameHref}
        </Code>
        <Button
          onClick={async () => {
            if (!canShare) {
              await navigator.clipboard.writeText(joinGameHref)
              toast({
                title: "Copied to clipboard",
                status: "success",
                isClosable: true,
              })
              return
            }
            await navigator.share({
              title: "SK0R",
              text: "Room Invitation",
              url: joinGameHref,
            })
          }}
        >
          {canShare ? "Share" : "Copy to clipboard"}
        </Button>
      </VStack>
    </>
  )
}
