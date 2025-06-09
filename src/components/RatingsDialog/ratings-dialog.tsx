'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useState } from 'react'

import { BookmarkSimpleIcon, BookOpenIcon, XIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { RatingStars } from '../RatingStars/rating-stars'
import { BookInfo } from './book-info'
import { BookWithAvgRating } from '../BookCard/book-card'
import { CategoriesOnBooks, Category } from '@prisma/client'
import { RatingWithAuthor } from '../UserReviewCard/user-review-card'
import { BookReviews } from '../BookReviews/book-reviews'

type BookDetails = BookWithAvgRating & {
  ratings: RatingWithAuthor[]
  categories: (CategoriesOnBooks & {
    category: Category
  })[]
}

type RatingDialogProps = {
  bookId: string
  children: ReactNode
}

export function RatingsDialog({ bookId, children }: RatingDialogProps) {
  const [open, setOpen] = useState(false)

  const { data: bookData } = useQuery<BookDetails>({
    queryKey: ['book', bookId],
    queryFn: async () => {
      const { data } = await api.get(`/books/details/${bookId}`)
      return data.book
    },
    enabled: open,
  })

  const book = bookData

  const ratingsLength = book?.ratings?.length ?? 0
  const categories =
    book?.categories?.map((X) => X?.category?.name)?.join(', ') ?? ''

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'fixed inset-0 bg-[#00000099]',
          )}
        />
        <Dialog.Content
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200',
            'fixed top-0 right-0 flex h-full flex-col overflow-y-auto bg-gray-900 px-3 py-2 shadow-[-4px_0px_30px_0px_#00000080] lg:w-165 lg:px-12 lg:py-6',
          )}
        >
          <Dialog.Title></Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <Dialog.Close className="mb-4 ml-auto flex items-center justify-center border-none bg-transparent text-gray-400">
            <XIcon size={24} />
          </Dialog.Close>
          {!book ? (
            <p className="text-gray-100">Carregando...</p>
          ) : (
            <div className="flex flex-col rounded-md bg-gray-800 px-8 py-6">
              <div className="flex gap-8">
                <Image
                  alt={book?.name}
                  src={book?.cover_url}
                  width={172}
                  height={242}
                  className="rounded-md object-cover lg:min-w-42.75"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h1 className="line-clamp-3 text-lg font-bold text-gray-100">
                      {book.name}
                    </h1>
                    <p className="mt-2 text-gray-300">{book.author}</p>
                  </div>
                  <div>
                    <RatingStars size="md" rating={book.avgRating} />
                    <p className="ml-[2px] text-gray-400">
                      {ratingsLength}{' '}
                      {ratingsLength === 1 ? 'avaliação' : 'avaliações'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-14 border-t border-gray-600 pt-6">
                <BookInfo
                  info="Categorias"
                  title={categories}
                  icon={
                    <BookmarkSimpleIcon className="text-teal-300" size={24} />
                  }
                />
                <BookInfo
                  info="Páginas"
                  title={String(book.total_pages)}
                  icon={<BookOpenIcon className="text-teal-300" size={24} />}
                />
              </div>
            </div>
          )}
          <BookReviews bookId={bookId} ratings={book?.ratings ?? []} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
