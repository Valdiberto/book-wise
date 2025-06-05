import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength?: number
}

export function TextArea({ maxLength, ...props }: TextAreaProps) {
  const valueLength = String(props.value)?.length ?? 0
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-sm border border-gray-500 bg-gray-800 text-gray-500 transition-[color,box-shadow] focus-within:border-green-200',
        'transition-all delay-150 duration-300 ease-in-out',
      )}
    >
      <textarea
        className={cn(
          'font-sm min-h-34 flex-1 resize-none border-none bg-gray-900 bg-none px-5 py-3.5 pr-12 text-gray-100 outline-none placeholder:text-gray-400',
        )}
        {...props}
        maxLength={maxLength}
      />
      {maxLength && (
        <span className="absolute right-3 bottom-1.5 text-xs text-[#7c7c8a]">
          {valueLength}/{maxLength}
        </span>
      )}
    </div>
  )
}
