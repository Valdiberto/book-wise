'use client'

import { BookWithAvgRating } from '@/@types/prisma'
import { BookCard } from '@/components/BookCard/book-card'
import { PageTitle } from '@/components/page-title'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/lib/axios'
import { BinocularsIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type Category = {
  id: string
  name: string
}

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
      <header className="mt-5 mb-10 flex flex-col justify-between space-y-5 lg:mt-0 lg:flex-row">
        <PageTitle title="Explorar" icon={<BinocularsIcon size={32} />} />
        <Input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Buscar livro ou autor"
          className="lg:max-w-108"
          icon={<MagnifyingGlassIcon size={20} />}
        />
      </header>

      <div className="flex gap-3 lg:mb-12">
        <Tabs defaultValue="tudo">
          <TabsList className="mb-22 flex-wrap lg:mb-0">
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

      <div className="mt-12 flex h-full auto-rows-[188px] flex-col gap-5 overflow-y-auto pb-10 lg:grid lg:grid-cols-3">
        {filteredBooks?.map((book) => (
          <BookCard key={book.id} book={book} size="lg" />
        ))}
      </div>
    </div>
  )
}
