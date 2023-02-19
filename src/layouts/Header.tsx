import { Button, chakra } from "@chakra-ui/react"
import * as React from "react"
import { Link } from "react-router-dom"

import { linker } from "../feature/navigation/linker"

interface HeaderProps {
  actionButtons?: React.ReactNode
}

export const Header = ({ actionButtons }: HeaderProps) => (
  <chakra.header
    display="flex"
    sx={{
      "@media (min-height: 54em)": {
        flexBasis: "36",
      },
    }}
    px="6"
    py="4"
    gap={{ base: "2", md: "8" }}
    alignItems="flex-end"
    boxShadow="md"
    position="sticky"
    top="0"
    zIndex="banner"
    bg="cyan.600"
  >
    <Button
      as={Link}
      to={linker.home()}
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
      <chakra.ul
        listStyleType="none"
        display="flex"
        gap="4"
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        {actionButtons}
      </chakra.ul>
    </chakra.nav>
  </chakra.header>
)
