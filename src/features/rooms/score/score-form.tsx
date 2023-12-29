import { Button } from '../../../components/button.tsx'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '../../../components/toggle-group.tsx'
import { type Operator, useOperator } from './use-operator.tsx'
import { type ComponentPropsWithRef, useEffect, useRef, useState } from 'react'

type ScoreFormProps = {
  score: number
  onSubmit: (values: { diff: number }) => void
} & Omit<ComponentPropsWithRef<'form'>, 'onSubmit'>
export const ScoreForm = (props: ScoreFormProps) => {
  const { score, onSubmit, ...rest } = props
  const { operator, setOperator } = useOperator()
  const [absoluteDiff, setAbsoluteDiff] = useState(score || 0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const nextScore = calculateNextScore(score || 0, absoluteDiff || 0, operator)

  useEffect(() => {
    inputRef.current?.select()
  }, [operator])

  return (
    <form
      {...rest}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ diff: nextScore - score })
      }}
    >
      <ToggleGroup value={operator} onValueChange={setOperator}>
        <ToggleGroupItem value={'add' satisfies Operator}>add</ToggleGroupItem>
        <ToggleGroupItem value={'subtract' satisfies Operator}>
          subtract
        </ToggleGroupItem>
        <ToggleGroupItem value={'set' satisfies Operator}>set</ToggleGroupItem>
      </ToggleGroup>
      <div className="flex">
        <input
          type="number"
          inputMode="numeric"
          pattern="\d*"
          value={absoluteDiff}
          onChange={(e) => setAbsoluteDiff(e.currentTarget.valueAsNumber)}
          className="w-full rounded bg-slate-50 bg-opacity-10 text-center text-5xl font-black tabular-nums text-slate-50"
          ref={inputRef}
          required
        />
      </div>
      <div className="flex w-full flex-wrap items-stretch gap-6">
        <div className="flex flex-1 flex-col">
          <p className="text-end text-sm font-black italic">next score is</p>
          <output className="text-end text-5xl font-black tabular-nums">
            {nextScore}
          </output>
        </div>
        <div className="flex-1 flex-shrink-0">
          <Button type="submit" variant="primary" className="min-h-full w-full">
            Save score
          </Button>
        </div>
      </div>
    </form>
  )
}

function calculateNextScore(score: number, diff: number, operator: Operator) {
  switch (operator) {
    case 'add':
      return score + diff
    case 'subtract':
      return score - diff
    case 'set':
      return diff
    default:
      throw new Error(`unknown operator ${operator}`)
  }
}
