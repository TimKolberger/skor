import { Container, Heading, Text } from "@chakra-ui/react"
import * as React from "react"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import { linker } from "../navigation/linker"

export default function SettingsPage() {
  return (
    <FullModalLayout to={linker.home()}>
      <Container display="flex" flexDirection="column" flex="1" gap="8" py="10">
        <Heading textAlign="center" size="4xl" textTransform="uppercase">
          Settings
        </Heading>
        <Text>
          Working on keyboard navigation, counter step settings and some sound
          effects.
        </Text>
      </Container>
    </FullModalLayout>
  )
}
