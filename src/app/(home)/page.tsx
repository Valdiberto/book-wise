import { LatestReviews } from '@/components/LatestReviews/latest-reviews'
import { PopularBooks } from '@/components/PopularBooks/popular-books'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Início',
}

export default function Home() {
  return (
    <section className="gap-16 overflow-hidden text-gray-50 lg:grid lg:grid-cols-[1fr_308px]">
      <LatestReviews />
      <PopularBooks />
    </section>
  )
}
