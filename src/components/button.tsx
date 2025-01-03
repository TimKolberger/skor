import { clsx } from 'clsx'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type ButtonProps = ComponentPropsWithoutRef<'button'> & ButtonVariants

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

Button.displayName = 'Button'

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { padding = 'slim', ...rest } = props
    return <Button {...rest} padding={padding} ref={ref} />
  },
)

IconButton.displayName = 'IconButton'

type ButtonLinkProps = LinkProps & ButtonVariants
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

ButtonLink.displayName = 'ButtonLink'

export const IconButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const { padding = 'slim', ...rest } = props
    return <ButtonLink {...rest} padding={padding} ref={ref} />
  },
)

IconButtonLink.displayName = 'IconButtonLink'

export type ButtonVariants = {
  variant?: 'ghost' | 'primary'
  padding?: 'normal' | 'slim'
  size?: 'sm' | 'md' | 'lg'
}

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
        'bg-slate-800 hover:bg-slate-900',
        'active:bg-slate-950 aria-expanded:bg-slate-950',
        'focus-visible:bg-slate-900 focus-visible:shadow',
      ),
    }[variant],
    {
      normal: 'px-4',
      slim: 'px-2',
    }[padding],
    {
      sm: 'h-10 min-w-10 text-lg',
      md: 'h-11 min-w-11 text-xl',
      lg: 'h-12 min-w-12 text-2xl',
    }[size],
    'inline-flex items-center justify-center gap-2 rounded-md py-1 transition-all uppercase font-black',
  )
}
