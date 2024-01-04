import { Button } from '../../../components/button.tsx'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '../../../components/toggle-group.tsx'
import type { Assign } from '../../../utils/assign.types.ts'
import { useLastDiff } from './use-last-diff.ts'
import { type Operator, useOperator } from './use-operator.ts'
import { type ComponentPropsWithRef, useEffect, useRef } from 'react'

type ScoreFormProps = Assign<
  ComponentPropsWithRef<'form'>,
  {
    children?: never
    score: number
    onSubmit: (values: { diff: number }) => void
  }
>
export const ScoreForm = (props: ScoreFormProps) => {
  const { score, onSubmit, ...rest } = props
  const { operator, setOperator } = useOperator()
  const { diff, setDiff } = useLastDiff()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const nextScore = calculateNextScore(score || 0, diff, operator)

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
          aria-label="Diff"
          type="number"
          inputMode="numeric"
          pattern="\d*"
          value={diff}
          onChange={(e) => setDiff(e.currentTarget.valueAsNumber)}
          className="w-full rounded bg-slate-50 bg-opacity-10 text-center text-5xl font-black tabular-nums text-slate-50"
          ref={inputRef}
          required
        />
      </div>
      <div className="flex w-full flex-wrap items-stretch gap-6">
        <div className="flex flex-1 flex-col">
          <p className="text-end text-sm font-black italic">next score is</p>
          <output className="break-all text-end text-5xl font-black tabular-nums">
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
