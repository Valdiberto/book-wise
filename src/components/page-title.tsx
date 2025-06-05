import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'

type PageTitleProps = ComponentProps<'div'> & {
  icon: ReactNode
  title: string
}

export function PageTitle({
  className,
  icon,
  title,
  ...props
}: PageTitleProps) {
  return (
    <div
      className={cn('flex items-center gap-3 text-teal-300', className)}
      {...props}
    >
      {icon}
      <h1 className={cn('text-2xl font-bold text-gray-100', className)}>
        {title}
      </h1>
    </div>
  )
}
