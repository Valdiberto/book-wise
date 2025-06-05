import { Sidebar } from '@/components/sidebar'
import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr]">
      <Sidebar />
      <main className="scrollbar-hide m-[0_auto] h-screen w-full max-w-249 touch-pan-y overflow-y-auto pt-18">
        {children}
      </main>
    </div>
  )
}
