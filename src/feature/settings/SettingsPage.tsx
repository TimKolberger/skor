import { Container, Heading, List, ListItem, Switch } from "@chakra-ui/react"
import * as React from "react"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import { linker } from "../navigation/linker"
import { useMuted } from "./useMuted"

export default function SettingsPage() {
  const [muted, setMuted] = useMuted()
  return (
    <FullModalLayout to={linker.home()}>
      <Container display="flex" flexDirection="column" flex="1" gap="8" py="10">
        <Heading textAlign="center" size="4xl" textTransform="uppercase">
          Settings
        </Heading>
        <Switch
          isChecked={muted}
          onChange={(e) => setMuted(e.currentTarget.checked)}
          display="flex"
          alignItems="center"
        >
          Mute application sounds
        </Switch>
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
      </Container>
    </FullModalLayout>
  )
}
