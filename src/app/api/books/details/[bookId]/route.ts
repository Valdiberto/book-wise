import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { bookId: string } },
) {
  try {
    const bookId = params.bookId

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        ratings: {
          include: {
            user: true,
          },
        },
      },
    })

    const booksAvgRating = await prisma.rating.groupBy({
      by: ['book_id'],
      where: { book_id: bookId },
      _avg: { rate: true },
    })

    const bookWithAvgRating = {
      ...book,
      avgRating: booksAvgRating[0]?._avg.rate ?? 0,
    }

    return NextResponse.json({ book: bookWithAvgRating })
  } catch (error) {
    console.error('Error fetching books id', error)
    return NextResponse.json(
      { error: 'Failed to search books' },
      { status: 500 },
    )
  }
}
