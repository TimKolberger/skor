import { chakra, Kbd } from "@chakra-ui/react"

export const KeyboardShortcuts = () => (
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
