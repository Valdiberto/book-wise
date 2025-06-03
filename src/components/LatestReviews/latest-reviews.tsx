'use client'

import { ChartLineUpIcon } from '@phosphor-icons/react'
import { PageTitle } from '../page-title'
import { ReviewCard } from '../ReviewCard/review-card'

export function LatestReviews() {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto pb-10">
      <PageTitle
        title="Início"
        icon={<ChartLineUpIcon className="text-teal-300" size={32} />}
      />

      <header>
        <p className="mt-10 mb-4 text-sm text-gray-100">
          Avaliações mais recentes
        </p>
      </header>
      <section>
        <ReviewCard />
      </section>
    </div>
  )
}
