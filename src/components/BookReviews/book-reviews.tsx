import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import {
  RatingWithAuthor,
  UserReviewCard,
} from '../UserReviewCard/user-review-card'
import { LinkCustom } from '../ui/link'
import { ReviewForm } from '../ReviewForm/review-form'
import { LoginDialog } from '../LoginDialog/login-dialog'

type BookReviewsProps = {
  ratings: RatingWithAuthor[]
  bookId: string
}

export function BookReviews({ bookId, ratings }: BookReviewsProps) {
  const { status, data: session } = useSession()
  const [showForm, setShowForm] = useState(false)

  const isAuthenticated = status === 'authenticated'

  function handleReviewBook() {
    if (!isAuthenticated) return
    setShowForm(true)
  }

  const ReviewWrapper = isAuthenticated ? Fragment : LoginDialog

  const sortedRatingsByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const canRate = ratings.every((x) => x.user_id !== session?.user?.id)

  return (
    <div className="mt-10 flex flex-col">
      <header className="item-center mb-4 flex justify-between">
        <p className="text-sm text-gray-200">Avaliações</p>
        {canRate && (
          <ReviewWrapper>
            <LinkCustom
              href=""
              withoutIcon
              text="Avaliar"
              onClick={handleReviewBook}
            />
          </ReviewWrapper>
        )}
      </header>
      <section className="flex flex-col gap-3">
        {showForm && (
          <ReviewForm bookId={bookId} onCancel={() => setShowForm(false)} />
        )}
        {sortedRatingsByDate.map((rating) => (
          <UserReviewCard key={rating.id} rating={rating} />
        ))}
      </section>
    </div>
  )
}
