import { Box, forwardRef, HTMLChakraProps } from "@chakra-ui/react"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { linker } from "../feature/navigation/linker"

export type BaseLayoutProps = HTMLChakraProps<"div">

export const BaseLayout = forwardRef<BaseLayoutProps, "div">((props, ref) => {
  const navigate = useNavigate()
  useHotkeys(",", () => navigate(linker.settings()))
  useHotkeys("g", () => navigate(linker.home()))

  return (
    <Box
      ref={ref}
      animate="in"
      exit="out"
      display="flex"
      flexDirection="column"
      flex="1"
      {...props}
    />
  )
})
