import { ComponentProps, ReactNode } from 'react'

type PageTitleProps = ComponentProps<'div'> & {
  icon: ReactNode
  title: string
}

export function PageTitle({ icon, title, ...props }: PageTitleProps) {
  return (
    <div className="flex items-center gap-3" {...props}>
      {icon}
      <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
    </div>
  )
}
