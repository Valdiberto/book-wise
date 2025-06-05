import { ReactNode } from 'react'

type ProfileItemsDetailsProps = {
  icon: ReactNode
  info: string | number
  label: string
}

export function ProfileItemsDetails({
  icon,
  info,
  label,
}: ProfileItemsDetailsProps) {
  return (
    <div className="flex items-center gap-5">
      {icon}
      <div>
        <h1 className="font-bold text-gray-200">{info}</h1>
        <p className="text-sm text-gray-300">{label}</p>
      </div>
    </div>
  )
}
