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
