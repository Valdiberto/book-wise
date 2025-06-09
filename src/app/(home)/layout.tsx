import { Sidebar } from '@/components/sidebar'
import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="mx-2 flex h-screen flex-col lg:ml-0 lg:grid lg:w-full lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <main className="scrollbar-hide h-screen max-w-249 touch-pan-y overflow-y-auto lg:m-[0_auto] lg:w-full lg:pt-18">
        {children}
      </main>
    </div>
  )
}
