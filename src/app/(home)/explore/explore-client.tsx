'use client'

import { BookCard, BookWithAvgRating } from '@/components/BookCard/book-card'
import { PageTitle } from '@/components/page-title'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/lib/axios'
import { BinocularsIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function ExploreClient() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: categoriesData } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/books/categories')
      return data.categories
    },
  })

  const categories = categoriesData || []

  const { data: booksData } = useQuery<BookWithAvgRating[]>({
    queryKey: ['books', selectedCategory],
    queryFn: async () => {
      const { data } = await api.get('/books', {
        params: selectedCategory ? { category: selectedCategory } : {},
      })
      return data.books
    },
  })
  const books = booksData || []

  const filteredBooks = books?.filter((book) => {
    return (
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
  })
  return (
    <div className="flex w-full flex-col">
      <header className="mb-10 flex justify-between">
        <PageTitle title="Explorar" icon={<BinocularsIcon size={32} />} />
        <Input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Buscar livro ou autor"
          className="max-w-108"
          icon={<MagnifyingGlassIcon size={20} />}
        />
      </header>

      <div className="mb-12 flex gap-3">
        <Tabs defaultValue="tudo">
          <TabsList className="flex-wrap">
            <TabsTrigger value="tudo" onClick={() => setSelectedCategory(null)}>
              Tudo
            </TabsTrigger>

            {categories?.map((category) => (
              <TabsTrigger
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                value={category.id}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-12 grid h-full auto-rows-[188px] grid-cols-3 gap-5 overflow-y-auto pb-10">
        {filteredBooks?.map((book) => (
          <BookCard key={book.id} book={book} size="lg" />
        ))}
      </div>
    </div>
  )
}
