'use client'

import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { Rating, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Avatar } from '../ui/avatar'
import { RatingStars } from '../RatingStars/rating-stars'
import { cn } from '@/lib/utils'

export type RatingWithAuthor = Rating & {
  user: User
}

type UserReviewCardProps = {
  rating: RatingWithAuthor
}

export function UserReviewCard({ rating }: UserReviewCardProps) {
  const { data: session } = useSession()

  const isOwner = session?.user?.id === rating.user_id

  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')
  return (
    <div
      className={cn(
        'rounded-lg bg-gray-800 p-6',
        isOwner ? 'bg-gray-700' : 'bg-gray-800',
      )}
    >
      <div className="mb-5 flex items-start justify-between">
        <section className="flex gap-4">
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar alt={rating.user.name} src={rating.user.avatar_url || ''} />
          </Link>

          <div>
            <h1 className="font-md text-gray-100">{rating.user.name}</h1>
            <p className="text-sm text-gray-400">{distance}</p>
          </div>
        </section>
        <RatingStars rating={rating.rate} />
      </div>
      <p className="text-sm text-gray-300">{rating.description}</p>
    </div>
  )
}
