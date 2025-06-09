'use client'

import { CaretRightIcon, ChartLineUpIcon } from '@phosphor-icons/react'
import { PageTitle } from '../page-title'
import { RatingWithAuthorAndBook, ReviewCard } from '../ReviewCard/review-card'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { LinkCustom } from '../ui/link'

export function LatestReviews() {
  const { data: session } = useSession()

  const userId = session?.user?.id

  const { data: ratingsData } = useQuery<RatingWithAuthorAndBook[]>({
    queryKey: ['latest-ratings'],
    queryFn: async () => {
      const { data } = await api.get('/ratings/latest')

      return data
    },
  })

  const { data: latestUserRating } = useQuery<RatingWithAuthorAndBook>({
    queryKey: ['latest-user-rating', userId],
    queryFn: async () => {
      const { data } = await api.get<RatingWithAuthorAndBook[]>(
        '/ratings/user-latest',
      )

      return data[0]
    },
    enabled: !!userId,
  })

  const ratings = ratingsData || []

  return (
    <div className="mt-5 flex h-full w-full flex-col overflow-y-auto pb-10 lg:mt-0">
      <PageTitle title="Início" icon={<ChartLineUpIcon size={32} />} />
      {latestUserRating && (
        <div className="mt-8 mb-10 flex flex-col">
          <header className="mb-4 flex items-center justify-between gap-4">
            <p className="text-gray-100">Sua última avaliação</p>
            <LinkCustom
              icon={<CaretRightIcon />}
              iconposition="right"
              text="Ver todas"
              href={`/profile/${userId}`}
            />
          </header>

          <ReviewCard variant="compact" rating={latestUserRating} />
        </div>
      )}

      <header>
        <p className="mt-10 mb-4 text-sm text-gray-100">
          Avaliações mais recentes
        </p>
      </header>
      <section className="flex flex-col gap-3">
        {ratings?.map((rating) => (
          <ReviewCard key={rating.id} rating={rating} />
        ))}
      </section>
    </div>
  )
}
