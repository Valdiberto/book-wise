import { Sidebar } from '@/components/sidebar'
import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr]">
      <Sidebar />
      <main className="m-[0_auto] h-screen w-full max-w-249 overflow-y-auto pt-18">
        {children}
      </main>
    </div>
  )
}
