import { IconButtonLink } from '../components/button'
import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type AppLayoutProps = ComponentPropsWithoutRef<'div'>
export const AppLayout = (props: AppLayoutProps) => {
  const { className, ...rest } = props
  return <div {...rest} className={clsx('flex flex-1 flex-col', className)} />
}

type AppLayoutHeaderProps = ComponentPropsWithoutRef<'header'> & {
  backLink?: string
}
export const AppLayoutHeader = (props: AppLayoutHeaderProps) => {
  const { className, children, title, backLink, ...rest } = props
  return (
    <header
      {...rest}
      className={clsx(
        'sticky top-0 z-30 flex-grow-0 basis-36 justify-end shadow',
        className,
      )}
    >
      <div className="glass" />
      <div className="glass-edge" />
      <div className="absolute inset-0 flex flex-1 flex-col justify-end px-4 py-4">
        <div className="flex min-h-11 items-center gap-1">
          {backLink ? (
            <IconButtonLink to={backLink} className="-ms-2 self-start">
              <span className="sr-only">Back</span>
              <FiChevronLeft />
            </IconButtonLink>
          ) : null}
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col justify-end text-slate-200">
            <Link
              to="/"
              className="-ms-3 rounded-md px-3 text-5xl font-black transition-colors hover:bg-slate-200 hover:bg-opacity-10"
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
