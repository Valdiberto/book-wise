import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { ProfileRating } from './profile-ratings'
import Link from 'next/link'
import Image from 'next/image'
import { RatingStars } from '../RatingStars/rating-stars'

type ProfileRatingCardProps = {
  rating: ProfileRating
}

export function ProfileRatingsCard({ rating }: ProfileRatingCardProps) {
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-br')

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-300">{distance}</p>

      <div className="flex flex-col gap-6 rounded-lg bg-gray-900 p-6">
        <div className="flex gap-6">
          <Link className="flex" href={`/explore?book=${rating.book_id}`}>
            <Image
              src={rating.book.cover_url}
              alt={rating.book.name}
              width={98}
              height={134}
              className="max-w-25 rounded-md object-cover transition hover:brightness-125"
            />
          </Link>

          <section className="flex flex-col justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-100">
                {rating.book.name}
              </h1>
              <p className="text-sm text-gray-400">{rating.book.author}</p>
            </div>
            <RatingStars rating={rating.rate} />
          </section>
        </div>
        <p className="text-sm text-gray-300">{rating.description}</p>
      </div>
    </div>
  )
}
