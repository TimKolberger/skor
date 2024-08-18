import { IconButton } from './button'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { FiX } from 'react-icons/fi'
import { Drawer as Vaul } from 'vaul'

export const Drawer = (props: ComponentPropsWithoutRef<typeof Vaul.Root>) => {
  const { children, ...rest } = props
  return <Vaul.Root {...rest}>{children}</Vaul.Root>
}

type DrawerContentProps = ComponentPropsWithoutRef<typeof Vaul.Content> & {
  height?: string
}
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (props, ref) => {
    const { style, height, children, ...rest } = props
    return (
      <Vaul.Portal>
        <Vaul.Content
          {...rest}
          style={{
            ...style,
            height,
          }}
          className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[97dvh] flex-col rounded-t-lg bg-slate-800 bg-opacity-30 backdrop-blur-2xl"
          ref={ref}
        >
          <div className="mx-auto mb-8 mt-2 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
          <div className="flex flex-col overflow-y-auto px-4 pb-8">
            {children}
          </div>
          <Vaul.Close asChild>
            <IconButton className="absolute right-2 top-2" size="sm">
              <FiX />
            </IconButton>
          </Vaul.Close>
        </Vaul.Content>
        <Vaul.Overlay className="fixed inset-0 z-40 bg-black/40" />
      </Vaul.Portal>
    )
  },
)

DrawerContent.displayName = 'DrawerContent'

export const DrawerTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Vaul.Trigger>
>((props, ref) => {
  return <Vaul.Trigger {...props} asChild ref={ref} />
})

DrawerTrigger.displayName = 'DrawerTrigger'

export const DrawerTitle = Vaul.Title
export const DrawerDescription = Vaul.Description
