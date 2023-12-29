import { clsx } from 'clsx'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & ButtonVariants

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'ghost',
      padding = 'normal',
      size = 'md',
      type = 'button',
      ...rest
    } = props
    return (
      <button
        {...rest}
        type={type}
        className={clsx(buttonClasses({ variant, padding, size }), className)}
        ref={ref}
      />
    )
  },
)

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { padding = 'slim', ...rest } = props
    return <Button {...rest} padding={padding} ref={ref} />
  },
)

export type ButtonLinkProps = LinkProps & ButtonVariants
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const {
      variant = 'ghost',
      padding = 'normal',
      size = 'md',
      className,
      ...rest
    } = props
    return (
      <Link
        {...rest}
        className={clsx(buttonClasses({ variant, padding, size }), className)}
        ref={ref}
      />
    )
  },
)

export const IconButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const { padding = 'slim', ...rest } = props
    return <ButtonLink {...rest} padding={padding} ref={ref} />
  },
)

export type ButtonVariants = {
  variant?: 'ghost' | 'primary'
  padding?: 'normal' | 'slim'
  size?: 'sm' | 'md' | 'lg'
}

// eslint-disable-next-line react-refresh/only-export-components
export function buttonClasses({
  variant = 'primary',
  padding = 'normal',
  size = 'md',
}: ButtonVariants) {
  return clsx(
    {
      ghost: clsx(
        'bg-slate-200 bg-opacity-0 hover:bg-opacity-10',
        'active:bg-opacity-5 aria-expanded:bg-opacity-5',
        'focus-visible:bg-opacity-10 focus-visible:shadow',
      ),
      primary: clsx(
        'border-2 border-slate-200 border-opacity-20',
        'hover:bg-slate-200 hover:bg-opacity-10',
        'focus-visible:bg-slate-100 focus-visible:bg-opacity-10 focus-visible:shadow',
      ),
    }[variant],
    {
      normal: 'px-4',
      slim: 'px-2',
    }[padding],
    {
      sm: 'h-[2.5rem] min-w-[2.5rem] text-lg',
      md: 'h-[2.75rem] min-w-[2.75rem] text-2xl',
      lg: 'h-[3rem] min-w-[3rem] text-3xl',
    }[size],
    'inline-flex items-center justify-center gap-2 rounded-md py-1 transition-all uppercase font-black',
  )
}
