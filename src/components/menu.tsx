import { buttonClasses, type ButtonVariants } from './button.tsx'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

export const Menu = (props: RadixMenu.DropdownMenuProps) => {
  const { children } = props
  return <RadixMenu.Root>{children}</RadixMenu.Root>
}

export const MenuContent = (props: RadixMenu.DropdownMenuContentProps) => {
  const { className, ...rest } = props
  return (
    <RadixMenu.Portal>
      <RadixMenu.Content
        sideOffset={8}
        {...rest}
        className={clsx(
          className,
          'z-40 rounded border border-slate-50 border-opacity-10 bg-cyan-700 shadow-lg focus-visible:ring-0',
        )}
      />
    </RadixMenu.Portal>
  )
}

export const MenuItem = (props: RadixMenu.MenuItemProps) => {
  const { className, ...rest } = props

  return (
    <RadixMenu.Item
      {...rest}
      className={clsx(
        className,
        'flex items-center gap-3 px-3 py-2',
        'bg-slate-50 bg-opacity-0',
        'transition hover:bg-opacity-5 focus-visible:bg-opacity-5 focus-visible:ring-0',
        'cursor-pointer',
      )}
    />
  )
}

export const MenuSeparator = (props: RadixMenu.DropdownMenuSeparatorProps) => {
  const { className, ...rest } = props
  return (
    <RadixMenu.Separator
      {...rest}
      className={clsx(
        className,
        'my-1 border-t border-slate-50 border-opacity-25',
      )}
    />
  )
}

export const MenuButton = (
  props: RadixMenu.DropdownMenuTriggerProps & ButtonVariants,
) => {
  const { className, variant, padding, size, ...rest } = props
  return (
    <RadixMenu.Trigger
      {...rest}
      className={clsx(className, buttonClasses({ variant, padding, size }))}
    />
  )
}
