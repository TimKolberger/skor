import type { ComponentPropsWithoutRef } from 'react'

type TimeProps = Omit<ComponentPropsWithoutRef<'time'>, 'dateTime'> & {
  dateTime?: Date | string | number | null
}
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
