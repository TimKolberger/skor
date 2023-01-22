import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import { motion } from "framer-motion"

export interface MainProps extends HTMLChakraProps<"main"> {}

export const Main = (props: MainProps) => (
  <chakra.main
    as={motion.main}
    flex="1 0 auto"
    display="flex"
    flexDirection="column"
    px={{ base: "4", md: "6" }}
    {...props}
  />
)
