import { Button, chakra } from "@chakra-ui/react"
import * as React from "react"
import { Link, LinkProps } from "react-router-dom"

import { linker } from "../feature/linker/linker"

interface HeaderProps {
  to?: LinkProps["to"]
  actionButtons: React.ReactNode
}

export const Header = ({ to = linker.home(), actionButtons }: HeaderProps) => (
  <chakra.header
    display="flex"
    flexBasis="36"
    sx={{
      "@media (min-height: 30em)": {
        flexBasis: "36",
      },
    }}
    px="6"
    py="4"
    alignItems="flex-end"
    boxShadow="md"
    position="sticky"
    top="0"
    zIndex="banner"
    bg="cyan.600"
  >
    <Button
      as={Link}
      to={to}
      size="lg"
      variant="ghost"
      fontWeight="black"
      fontSize="5xl"
      lineHeight="1"
      px="3"
      ml="-3"
    >
      SK0R
    </Button>
    <chakra.nav ml="auto">
      <chakra.ul listStyleType="none" display="flex" gap="4">
        {actionButtons}
      </chakra.ul>
    </chakra.nav>
  </chakra.header>
)
