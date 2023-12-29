import { buttonClasses, type ButtonVariants } from './button.tsx'
import {
  Menu as AriaMenu,
  MenuButton as AriaMenuButton,
  type MenuButtonProps,
  MenuItem as AriaMenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuProvider as AriaMenuProvider,
  type MenuProviderProps,
  MenuSeparator as AriaMenuSeparator,
  type MenuSeparatorProps,
} from '@ariakit/react'
import clsx from 'clsx'

export const Menu = (props: MenuProviderProps) => {
  const { children } = props
  return <AriaMenuProvider>{children}</AriaMenuProvider>
}

export const MenuContent = (props: MenuProps) => {
  const { className, ...rest } = props
  return (
    <AriaMenu
      gutter={8}
      {...rest}
      className={clsx(
        className,
        'rounded border border-slate-50 border-opacity-10 bg-cyan-700 shadow-lg',
      )}
    />
  )
}

export const MenuItem = (props: MenuItemProps) => {
  const { className, ...rest } = props

  return (
    <AriaMenuItem
      {...rest}
      className={clsx(
        className,
        'flex items-center gap-3 px-3 py-2',
        'bg-slate-50 bg-opacity-0',
        'transition hover:bg-opacity-5 focus-visible:bg-opacity-5',
        'cursor-pointer',
      )}
    />
  )
}

export const MenuSeparator = (props: MenuSeparatorProps) => {
  const { className, ...rest } = props
  return (
    <AriaMenuSeparator
      {...rest}
      className={clsx(className, 'my-1 border-slate-50 border-opacity-25')}
    />
  )
}

export const MenuButton = (props: MenuButtonProps & ButtonVariants) => {
  const { className, variant, padding, size, ...rest } = props
  return (
    <AriaMenuButton
      {...rest}
      className={clsx(className, buttonClasses({ variant, padding, size }))}
    />
  )
}
