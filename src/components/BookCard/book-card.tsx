import Image from 'next/image'
import { RatingStars } from '../RatingStars/rating-stars'
import { RatingsDialog } from '../RatingsDialog/ratings-dialog'
import { BookWithAvgRating } from '@/@types/prisma'

type BookCardProps = {
  book: BookWithAvgRating
  size?: 'md' | 'lg'
}

export function BookCard({ book, size = 'md' }: BookCardProps) {
  const IMAGE_SIZES = {
    md: {
      width: 64,
      height: 94,
    },
    lg: {
      width: 108,
      height: 151,
    },
  }

  return (
    <RatingsDialog bookId={book?.id}>
      <div className="relative flex cursor-pointer gap-5 overflow-hidden rounded-lg border-1 border-solid border-gray-900 bg-gray-900 p-3 hover:border-gray-600 lg:px-5 lg:py-4">
        {book?.alreadyRead && (
          <span className="absolute top-0 right-0 block rounded-[0px_4px_0px_4px] bg-[#0a313c] px-3 py-1 text-xs font-bold text-green-300">
            LIDO
          </span>
        )}
        <Image
          src={book.cover_url}
          alt={book.name}
          width={IMAGE_SIZES[size].width}
          height={IMAGE_SIZES[size].height}
          className={`min-w[${IMAGE_SIZES[size].width}] rounded-md object-cover hover:brightness-125`}
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="line-clamp-2 overflow-hidden font-bold text-ellipsis text-gray-100">
              {book.name}
            </h1>
            <p className="text-sm text-gray-400">{book.author}</p>
          </div>
          <RatingStars rating={book.avgRating} />
        </div>
      </div>
    </RatingsDialog>
  )
}
