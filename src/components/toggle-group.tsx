import * as RadixToggleGroup from '@radix-ui/react-toggle-group'
import { clsx } from 'clsx'

export const ToggleGroup = (
  props: RadixToggleGroup.ToggleGroupImplSingleProps,
) => {
  const { className, ...rest } = props
  return (
    <RadixToggleGroup.Root
      {...rest}
      type="single"
      className={clsx(className, 'flex w-full justify-evenly gap-2')}
    />
  )
}

export const ToggleGroupItem = (
  props: RadixToggleGroup.ToggleGroupItemProps,
) => {
  const { className, ...rest } = props
  return (
    <RadixToggleGroup.Item
      {...rest}
      className={clsx(
        className,
        'flex-1 transition',
        'text-md rounded-full px-2 py-1 font-black uppercase',
        'bg-slate-100 bg-opacity-0',
        'data-[state=on]:bg-opacity-100 data-[state=on]:text-slate-900',
      )}
    />
  )
}
