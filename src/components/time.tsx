import type { Assign } from '../utils/assign.types.ts'
import type { ComponentPropsWithoutRef } from 'react'

type TimeProps = Assign<
  ComponentPropsWithoutRef<'time'>,
  {
    dateTime?: Date | string | number | null
  }
>
export const Time = ({ dateTime, ...rest }: TimeProps) => {
  if (!dateTime) {
    return null
  }
  const date = new Date(dateTime)
  const formatted = Intl.DateTimeFormat(navigator.language).format(date)
  return (
    <time {...rest} dateTime={date.toISOString()}>
      {formatted}
    </time>
  )
}
