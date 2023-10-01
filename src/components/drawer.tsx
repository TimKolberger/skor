import { IconButton } from './button.tsx'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { FiX } from 'react-icons/fi'
import { Drawer as Vaul } from 'vaul'

export const Drawer = (props: ComponentPropsWithoutRef<typeof Vaul.Root>) => {
  const { children, ...rest } = props
  return <Vaul.Root {...rest}>{children}</Vaul.Root>
}

export const DrawerContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Vaul.Content>
>((props, ref) => {
  return (
    <Vaul.Portal>
      <Vaul.Content
        {...props}
        className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-slate-100 px-4 text-slate-900"
        ref={ref}
      >
        <div className="mx-auto mb-8 mt-2 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
        {props.children}
        <Vaul.Close asChild>
          <IconButton className="absolute right-2 top-2" size="sm">
            <FiX />
          </IconButton>
        </Vaul.Close>
      </Vaul.Content>
      <Vaul.Overlay className="fixed inset-0 z-40 bg-black/40" />
    </Vaul.Portal>
  )
})

export const DrawerTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Vaul.Trigger>
>((props, ref) => {
  return <Vaul.Trigger {...props} asChild ref={ref} />
})
