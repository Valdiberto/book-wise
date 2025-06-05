import * as React from 'react'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type InputProps = React.ComponentProps<'input'> & {
  icon?: ReactNode
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div
      className={cn(
        'relative flex w-full items-center pr-5 text-blue-900 focus-within:text-teal-900',
        className,
      )}
    >
      <input
        type={type}
        data-slot="input"
        className={cn(
          'dark:bg-input/30 h-12 min-w-0 flex-1 rounded-md border border-blue-900 bg-none py-1 pr-10 pl-5 text-sm text-gray-100 shadow-xs transition-[color,box-shadow] outline-none selection:bg-green-100 selection:text-gray-100 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-100 placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-teal-900 focus-visible:ring-[1px] focus-visible:ring-teal-800/50',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 transform">
        {icon}
      </div>
    </div>
  )
}

export { Input }
