import {
  chakra,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Kbd,
  List,
  ListItem,
  Switch,
} from "@chakra-ui/react"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { FullModalLayout } from "../../layouts/FullModalLayout"
import { Main } from "../../layouts/Main"
import { MobileFriendlyNumberInput } from "../formFields/MobileFriendlyNumberInput"
import { useGame } from "../game/useGame"
import { useGameService } from "../game/useGameService"
import { linker } from "../navigation/linker"
import { useMuted } from "./useMuted"

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

const KeyboardShortcuts = () => {
  return (
    <chakra.div display="grid" gridTemplateColumns="auto 1fr" columnGap="3">
      <span>
        <Kbd>0-9</Kbd>
      </span>
      <span>Increment player score by index</span>

      <span>
        <Kbd>SHIFT + 0-9</Kbd>
      </span>
      <span>Decrement player score by index</span>

      <span>
        <Kbd>S</Kbd>
      </span>
      <span>Toggle sort direction</span>

      <span>
        <Kbd>A</Kbd>
      </span>
      <span>Add player</span>

      <span>
        <Kbd>ESC</Kbd>
      </span>
      <span>Close modal views</span>

      <span>
        <Kbd>,</Kbd>
      </span>
      <span>Open settings</span>

      <span>
        <Kbd>g</Kbd>
      </span>
      <span>Open game view</span>
    </chakra.div>
  )
}

const MuteSwitch = () => {
  const [muted, setMuted] = useMuted()

  return (
    <Switch
      isChecked={muted}
      onChange={(e) => setMuted(e.currentTarget.checked)}
      display="flex"
      alignItems="center"
    >
      Mute application sounds
    </Switch>
  )
}

const UpdateStepForm = () => {
  const gameService = useGameService()
  const game = useGame()

  return (
    <FormControl>
      <FormLabel>Increase score with each tick by</FormLabel>
      <MobileFriendlyNumberInput
        value={game.step}
        onChange={(step) => gameService.send({ type: "SET_STEP", step })}
      />
    </FormControl>
  )
}
