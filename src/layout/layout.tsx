import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

type AppLayoutProps = ComponentPropsWithoutRef<'div'>
export const AppLayout = (props: AppLayoutProps) => {
  return (
    <div {...props} className={clsx('flex flex-1 flex-col', props.className)} />
  )
}

type AppLayoutHeaderProps = ComponentPropsWithoutRef<'main'>
export const AppLayoutHeader = (props: AppLayoutHeaderProps) => {
  const { className, children, title, ...rest } = props
  return (
    <header
      {...rest}
      className={clsx(
        'sticky top-0 z-30 flex-grow-0 basis-[9rem] justify-end shadow',
        className,
      )}
    >
      <div className="glass" />
      <div className="glass-edge" />
      <div className="absolute inset-0 flex flex-1 flex-col justify-end px-6 py-4">
        <span>{title}</span>
        <div className="flex items-end justify-between">
          <div className="flex flex-col justify-end text-slate-200">
            <Link
              to="/"
              className="-ml-3 rounded-md px-3 text-5xl font-black transition-colors hover:bg-slate-200 hover:bg-opacity-10"
            >
              SK0R
            </Link>
          </div>
          <div className="flex items-end gap-1">{children}</div>
        </div>
      </div>
    </header>
  )
}

type AppLayoutContentProps = ComponentPropsWithoutRef<'main'> & {
  /**
   * @default 'full-size'
   */
  variant?: 'full-size' | 'max-width' | 'center'
}
export const AppLayoutContent = (props: AppLayoutContentProps) => {
  const { className, variant = 'full-size', ...rest } = props
  return (
    <main
      {...rest}
      className={clsx(
        'flex flex-1 flex-col',
        {
          'mx-auto w-full max-w-screen-lg px-4 py-8': variant === 'max-width',
          'items-center justify-center': variant === 'center',
        },
        className,
      )}
    />
  )
}
