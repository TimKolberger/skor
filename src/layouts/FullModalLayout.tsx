import { chakra, HTMLChakraProps, Icon, IconButton } from "@chakra-ui/react"
import * as React from "react"
import { FiX } from "react-icons/fi"
import { Link, LinkProps } from "react-router-dom"

import { linker } from "../feature/navigation/linker"
import { BaseLayout, BaseLayoutProps, modalVariants } from "./BaseLayout"
import { Header } from "./Header"

export interface FullModalLayoutProps extends BaseLayoutProps {
  to?: LinkProps["to"]
  bg?: HTMLChakraProps<"header">["bg"]
  actionButtons?: React.ReactNode
}

export const FullModalLayout = ({
  children,
  to = linker.home(),
  bg,
  actionButtons,
}: FullModalLayoutProps) => (
  <BaseLayout variants={modalVariants} bg={bg}>
    <Header
      actionButtons={
        <>
          {actionButtons}
          <chakra.li>
            <IconButton
              as={Link}
              to={to}
              variant="ghost"
              fontSize="2xl"
              icon={<Icon as={FiX} fontSize="2xl" />}
              aria-label="Close"
            />
          </chakra.li>
        </>
      }
    />
    {children}
  </BaseLayout>
)
