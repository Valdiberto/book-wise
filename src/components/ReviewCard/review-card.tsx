import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '../ui/avatar'
import { RatingStars } from '../RatingStars/rating-stars'
import { Book, Rating, User } from '@prisma/client'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { useToggleShowMore } from '@/hooks/useToggleShowMore'
import { tv } from 'tailwind-variants'

export type RatingWithAuthorAndBook = Rating & {
  user: User
  book: Book
}

type ReviewCardProps = {
  rating: RatingWithAuthorAndBook
  variant?: 'default' | 'compact'
}

const card = tv({
  base: 'flex w-full flex-col rounded-lg bg-gray-900 p-6',
  variants: {
    variant: {
      default: 'bg-gray-900',
      compact: 'bg-gray-800',
    },
  },
})

const MAX_SUMMARY_LENGTH = 180

export function ReviewCard({ rating, variant = 'default' }: ReviewCardProps) {
  const summary = rating && rating.book ? rating.book.summary || '' : ''
  const {
    text: bookSummary,
    toggleShowMore,
    isShowingMore,
  } = useToggleShowMore(summary, MAX_SUMMARY_LENGTH)
  if (!rating || !rating.book) {
    return (
      <div className="flex w-full flex-col rounded-lg bg-gray-900 p-6">
        <p className="text-gray-400">Avaliação indisponível</p>
      </div>
    )
  }

  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-br')

  return (
    <div className={card({ variant })}>
      {variant === 'default' && (
        <div className="mb-8 flex items-start justify-between">
          <section className="flex items-center gap-4">
            <Link href={`/profile/${rating.user_id}`}>
              <Avatar
                size="md"
                src={rating.user.avatar_url ?? '/images/default-avatar.png'}
                alt={rating.user.name}
              />
            </Link>
            <div>
              <p className="text-gray-100">{rating.user.name}</p>
              <p className="text-sm text-gray-400">{distance}</p>
            </div>
          </section>
          <RatingStars rating={rating.rate} />
        </div>
      )}

      <div className="flex">
        <Link href={`/explore?book=${rating.book_id}`}>
          <Image
            className="mr-5 min-w-27 rounded-md object-cover hover:brightness-125"
            src={rating.book.cover_url}
            width={108}
            height={152}
            alt="book"
          />
        </Link>

        <div className="flex flex-col">
          <div>
            {variant === 'compact' && (
              <div className="mb-3 flex w-full items-center justify-between">
                <RatingStars rating={rating.rate} />
                <p className="text-sm text-gray-300">{distance}</p>
              </div>
            )}

            <h1 className="font-bold text-gray-100">{rating.book.name}</h1>
            <p className="text-sm text-gray-400"> {rating.book.author}</p>
          </div>
          <p className="mt-5 text-sm text-gray-300">
            {bookSummary}
            {(rating.book.summary?.length ?? 0) > MAX_SUMMARY_LENGTH && (
              <button
                className="ml-1 border-none bg-none text-sm font-bold text-purple-300"
                onClick={toggleShowMore}
              >
                {isShowingMore ? 'ver menos' : 'ver mais'}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
