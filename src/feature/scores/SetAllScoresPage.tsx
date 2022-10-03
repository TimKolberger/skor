import { chakra, Container, Heading } from "@chakra-ui/react"
import * as React from "react"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import { linker } from "../navigation/linker"
import { ConnectedScoreForm } from "./ScoreForm"

export default function SetAllScoresPage() {
  return (
    <FullModalLayout to={linker.home()}>
      <chakra.div
        display="flex"
        flex="1"
        flexDirection="column"
        gap="6"
        py="10"
      >
        <Container display="flex" flexDirection="column" gap="6">
          <Heading textAlign="center" size="4xl" textTransform="uppercase">
            All players
          </Heading>
          <ConnectedScoreForm />
        </Container>
      </chakra.div>
    </FullModalLayout>
  )
}
