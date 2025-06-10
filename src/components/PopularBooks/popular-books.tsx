'use client'

import { CaretRightIcon } from '@phosphor-icons/react'
import { LinkCustom } from '../ui/link'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { BookCard } from '../BookCard/book-card'
import { BookWithAvgRating } from '@/@types/prisma'

export function PopularBooks() {
  const { data: popularBooks } = useQuery<BookWithAvgRating[]>({
    queryKey: ['popular-books'],
    queryFn: async () => {
      const { data } = await api.get('/books/popular')
      return data?.books ?? []
    },
  })

  return (
    <div className="mt-16 flex w-full flex-col gap-4">
      <header className="flex items-center justify-between">
        <p className="text-sm text-gray-100">Livros populares</p>
        <LinkCustom
          text="Ver Todas"
          href="/explore"
          iconposition="right"
          icon={<CaretRightIcon />}
        />
      </header>

      <section className="flex flex-col gap-3">
        {popularBooks?.map((book) => (
          <BookCard key={`popular-${book.id}`} book={book} />
        ))}
      </section>
    </div>
  )
}
