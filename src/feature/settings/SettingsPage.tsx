import { chakra, Container, Heading, List, ListItem } from "@chakra-ui/react"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import { Main } from "../../layouts/Main"
import { KeyboardShortcuts } from "../navigation/KeyboardShortcuts"
import { linker } from "../navigation/linker"
import { MuteSwitch } from "./MuteSwitch"
import { UpdateStepForm } from "./UpdateStepForm"

export default function SettingsPage() {
  const navigate = useNavigate()
  useHotkeys("esc", () => navigate(linker.home()))

  return (
    <FullModalLayout>
      <Container
        as={Main}
        display="flex"
        flexDirection="column"
        flex="1"
        gap="8"
        py="10"
      >
        <chakra.section display="flex" flexDirection="column" gap="8" py="8">
          <Heading textAlign="center" size="4xl" textTransform="uppercase">
            Settings
          </Heading>
          <MuteSwitch />
          <UpdateStepForm />
        </chakra.section>

        <chakra.section display="flex" flexDirection="column" gap="8" py="8">
          <Heading textAlign="center" size="2xl" textTransform="uppercase">
            Keyboard Shortcuts
          </Heading>
          <KeyboardShortcuts />
        </chakra.section>

        <chakra.section display="flex" flexDirection="column" gap="8" py="8">
          <Heading textAlign="center" size="2xl" textTransform="uppercase">
            Authors
          </Heading>
          <List>
            <ListItem>
              Tim Kolberger <i>Coding</i>
            </ListItem>
            <ListItem>
              Frank Schneider <i>Design made in 2017 and still lit af</i>
            </ListItem>
          </List>
        </chakra.section>
      </Container>
    </FullModalLayout>
  )
}
