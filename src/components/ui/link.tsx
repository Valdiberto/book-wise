import { cn } from '@/lib/utils'
import Link from 'next/link'

import { ComponentProps, ReactNode } from 'react'

type LinkCustomProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  icon?: ReactNode
  text: string
  iconposition?: 'left' | 'right'
  withoutIcon?: boolean
}

export function LinkCustom({
  className,
  href,
  text,
  icon,
  withoutIcon,
  iconposition = 'right',
  ...props
}: LinkCustomProps) {
  return (
    <Link
      className={cn(
        'flex items-center gap-2 px-2 py-1 text-sm font-bold text-purple-300',
        className,
      )}
      href={href}
      {...props}
    >
      {!withoutIcon && icon && iconposition === 'left' && <span>{icon}</span>}
      {text}
      {!withoutIcon && icon && iconposition === 'right' && <span>{icon}</span>}
    </Link>
  )
}
