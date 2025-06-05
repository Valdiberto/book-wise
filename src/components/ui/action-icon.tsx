import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'

type ActionIconProps = ComponentProps<'button'> & {
  icon: ReactNode
}

export function ActionIcon({ icon, ...props }: ActionIconProps) {
  return (
    <button
      {...props}
      className={cn(
        'h-10 w-10 cursor-pointer items-center justify-center rounded-sm border-none bg-gray-600 p-2 transition-[color,box-shadow]',
        'hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all delay-150 duration-200 ease-in-out',
      )}
    >
      {icon}
    </button>
  )
}
