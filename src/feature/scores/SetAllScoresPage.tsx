import { Container, Heading } from "@chakra-ui/react"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import { linker } from "../navigation/linker"
import { ConnectedScoreForm } from "./ScoreForm"

export default function SetAllScoresPage() {
  const navigate = useNavigate()
  useHotkeys("esc", () => navigate(linker.home()))
  return (
    <FullModalLayout to={linker.home()}>
      <Container display="flex" flexDirection="column" flex="1" gap="8" py="10">
        <Heading textAlign="center" size="4xl" textTransform="uppercase">
          All players
        </Heading>
        <ConnectedScoreForm />
      </Container>
    </FullModalLayout>
  )
}
