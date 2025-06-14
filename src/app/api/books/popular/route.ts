import { BookWithRatings, RatingGroupByResult } from '@/@types/prisma'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        ratings: {
          _count: 'desc',
        },
      },
      include: {
        ratings: true,
      },
      take: 4,
    })

    if (!books.length) {
      return NextResponse.json({ error: 'books not found' }, { status: 404 })
    }

    const booksAvgRating = await prisma.rating.groupBy({
      by: ['book_id'],
      where: {
        book_id: {
          in: books.map((book: BookWithRatings) => book.id),
        },
      },
      _avg: {
        rate: true,
      },
    })

    const booksWithAvgRating = books.map((book: BookWithRatings) => {
      const bookAvgRating = booksAvgRating.find(
        (avgRating: RatingGroupByResult) => avgRating.book_id === book.id,
      )
      const { /* ratings, */ ...bookInfo } = book
      return {
        ...bookInfo,
        avgRating: bookAvgRating?._avg.rate,
      }
    })
    return NextResponse.json({ books: booksWithAvgRating })
  } catch (error) {
    console.error('Error fetching books with avg rating:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books ratings' },
      { status: 500 },
    )
  }
}
