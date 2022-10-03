import { Container, Heading } from "@chakra-ui/react"
import * as React from "react"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import { linker } from "../navigation/linker"
import { ConnectedScoreForm } from "./ScoreForm"

export default function SetAllScoresPage() {
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
