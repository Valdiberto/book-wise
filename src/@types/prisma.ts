import { Book, Rating } from '@prisma/client'

export type BookWithRatings = Book & {
  ratings: Rating[]
}
