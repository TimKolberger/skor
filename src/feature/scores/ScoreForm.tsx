import { Button, ButtonGroup, chakra, Text } from "@chakra-ui/react"
import * as React from "react"
import { Link, useNavigate } from "react-router-dom"

import { calcNextScore } from "../game/gameMachine"
import { useGame } from "../game/useGame"
import { useGameService } from "../game/useGameService"
import { linker } from "../linker/linker"
import { LS_KEY_SCORE_OPERATOR } from "../persistence/localStorageKeys"
import { useLocalStorage } from "../persistence/useLocalStorage"
import { Player } from "../players/playerMachine"
import { ScoreOperator, ScoreOperatorFormField } from "./ScoreOperatorFormField"
import { UpdateScoreFormField } from "./UpdateScoreFormField"

export interface ConnectedScoreFormProps {
  player?: Player
}

export const ConnectedScoreForm = ({ player }: ConnectedScoreFormProps) => {
  const { scores } = useGame()
  const gameService = useGameService()
  const navigate = useNavigate()
  const score = scores?.[player?.id ?? ""]

  return (
    <ScoreForm
      score={score?.total}
      onSubmit={(values) => {
        gameService.send({
          type: "SET_SCORE",
          playerId: player?.id,
          operator: values.operator,
          score: values.score,
        })
        navigate(linker.home())
      }}
    />
  )
}

interface ScoreFormProps {
  score?: number
  operator?: ScoreOperator
  onSubmit: (values: { score: number; operator: ScoreOperator }) => void
}

const ScoreForm = (props: ScoreFormProps) => {
  const [operator, setOperator] = useLocalStorage<ScoreOperator>(
    LS_KEY_SCORE_OPERATOR,
    props.operator || "add"
  )
  const [score, setScore] = React.useState(
    operator === "set" && props.score ? props.score : 0
  )
  return (
    <chakra.form
      display="flex"
      flexDirection="column"
      gap="10"
      flex="1 1"
      onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit?.({ score: Number(score), operator })
      }}
    >
      <ScoreOperatorFormField value={operator} onChange={setOperator} />
      <UpdateScoreFormField
        value={score}
        onChange={(value) => setScore(value || 0)}
      />
      {props.score !== undefined ? (
        <Text
          fontSize="3xl"
          fontWeight="bold"
          fontStyle="italic"
          textAlign="right"
        >
          next score is{" "}
          <chakra.span fontSize="6xl">
            {calcNextScore(props.score, operator, score)}
          </chakra.span>
        </Text>
      ) : null}
      <ButtonGroup
        flexDirection="row-reverse"
        gap="3"
        justifyContent="flex-start"
      >
        <Button type="submit" variant="outline">
          Save score
        </Button>
        <Button as={Link} to={linker.home()} variant="ghost">
          Cancel
        </Button>
      </ButtonGroup>
    </chakra.form>
  )
}
