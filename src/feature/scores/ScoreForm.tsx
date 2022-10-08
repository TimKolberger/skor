import { Button, chakra, Text } from "@chakra-ui/react"
import * as React from "react"
import { useNavigate } from "react-router-dom"

import { BetterNumberInput } from "../formFields/BetterNumberInput"
import { calcNextScore } from "../game/gameMachine"
import { useGame } from "../game/useGame"
import { useGameService } from "../game/useGameService"
import { linker } from "../navigation/linker"
import { LS_KEY_SCORE_OPERATOR } from "../persistence/localStorageKeys"
import { useLocalStorage } from "../persistence/useLocalStorage"
import { Player } from "../players/playerMachine"
import { ScoreOperator, ScoreOperatorFormField } from "./ScoreOperatorFormField"

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
      <chakra.fieldset display="flex" flexDirection="column" gap="3">
        <ScoreOperatorFormField value={operator} onChange={setOperator} />
        <BetterNumberInput
          value={score}
          onChange={(value) => setScore(value || 0)}
        />
      </chakra.fieldset>
      <chakra.div
        display="flex"
        justifyContent="flex-end"
        alignItems="stretch"
        flexWrap="wrap"
        gap="6"
      >
        {props.score !== undefined ? (
          <Text
            flex="1"
            flexBasis="32"
            fontSize="xl"
            fontWeight="bold"
            fontStyle="italic"
            textAlign="right"
            mr="auto"
          >
            next score is
            <br />
            <chakra.span fontSize="6xl" lineHeight="1">
              {calcNextScore(props.score, operator, score)}
            </chakra.span>
          </Text>
        ) : null}

        <Button
          size="lg"
          type="submit"
          variant="outline"
          flex="1 0"
          flexBasis="32"
          h="auto"
          minH="12"
        >
          Save score
        </Button>
      </chakra.div>
    </chakra.form>
  )
}
