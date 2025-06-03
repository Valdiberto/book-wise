import type { Metadata } from 'next'
import { Nunito_Sans as NunitoSans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const nunitoSans = NunitoSans({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Book Wise',
    default: 'Book Wise',
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable}`}>
      <body className={`antialiased`}>
        <div>
          <main className="font-nunito min-h-screen">
            <Providers> {children}</Providers>
          </main>
        </div>
      </body>
    </html>
  )
}
