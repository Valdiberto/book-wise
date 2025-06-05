import { ReactNode } from 'react'

type BookInfoProps = {
  icon: ReactNode
  title: string
  info: string
}

export function BookInfo({ icon, info, title }: BookInfoProps) {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <div>
        <p className="text-sm text-gray-300">{info}</p>
        <h1 className="font-bold text-gray-200">{title}</h1>
      </div>
    </div>
  )
}
