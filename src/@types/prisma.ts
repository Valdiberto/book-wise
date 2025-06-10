import { Book, Rating } from '@prisma/client'

export type BookWithRatings = Book & {
  ratings: Rating[]
}

export type RatingGroupByResult = {
  book_id: string
  _avg: {
    rate: number | null
  }
}

export type BookWithAvgRating = Book & {
  avgRating: number
  alreadyRead: boolean
}

export type RatingWithBook = {
  book: {
    total_pages: number
    author: string
    categories: {
      category: {
        name: string
      }
    }[]
  }
}

export type UserProfile = {
  id: string
  avatar_url: string | null
  name: string | null
  created_at: Date
  ratings: RatingWithBook[]
}
