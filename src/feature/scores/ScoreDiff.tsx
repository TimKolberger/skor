import { chakra, HTMLChakraProps } from "@chakra-ui/react"

import { ScoreSlice } from "../game/gameMachine"

interface ScoreDiffProps extends HTMLChakraProps<"div"> {
  scoreSlice: ScoreSlice
}

export const ScoreDiff = ({ scoreSlice, ...props }: ScoreDiffProps) => {
  const absoluteDiff = Math.abs(scoreSlice.diff)
  const operator = scoreSlice.diff < 0 ? "-" : "+"
  const diffElements = absoluteDiff ? (
    <>
      <span>{operator}</span>
      <span>{absoluteDiff}</span>
    </>
  ) : null

  return (
    <chakra.div
      display="flex"
      justifyContent="center"
      columnGap="3"
      rowGap="0"
      fontWeight="black"
      fontSize="5xl"
      lineHeight="shorter"
      flexWrap="wrap"
      {...props}
    >
      <span>{scoreSlice.total}</span>
      {diffElements}
    </chakra.div>
  )
}
