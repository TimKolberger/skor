import { clsx } from 'clsx'
import type { ComponentPropsWithRef } from 'react'

export const IconContainer = (props: ComponentPropsWithRef<'div'>) => {
  const { className, ...rest } = props
  return (
    <div
      className={clsx(
        className,
        'mx-auto flex size-20 items-center justify-center rounded-full bg-slate-100 bg-opacity-25 text-5xl',
      )}
      {...rest}
    />
  )
}
