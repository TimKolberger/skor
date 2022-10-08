import { forwardRef } from "@chakra-ui/react"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

import { linker } from "../feature/navigation/linker"
import { MotionBox } from "./MotionBox"

export const modalVariants = {}

export const pageVariants = {
  initial: {
    opacity: 0,
    transition: {
      staggerChildren: 50,
    },
  },
  in: {
    opacity: 1,
    transition: {
      staggerChildren: 50,
    },
  },
  out: {
    opacity: 0.8,
    transition: {
      staggerChildren: 50,
    },
  },
}

export interface BaseLayoutProps
  extends React.ComponentProps<typeof MotionBox> {}

export const BaseLayout = forwardRef<BaseLayoutProps, "div">((props, ref) => {
  const navigate = useNavigate()
  useHotkeys(",", () => navigate(linker.settings()))
  useHotkeys("g", () => navigate(linker.home()))

  return (
    <MotionBox
      ref={ref}
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      display="flex"
      flexDirection="column"
      flex="1"
      {...props}
    />
  )
})
