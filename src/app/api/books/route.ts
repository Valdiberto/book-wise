import { prisma } from '@/lib/prisma'

import { authOptions } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

type RatingGroupByResult = {
  book_id: string
  _avg: {
    rate: number | null
  }
}

type Book = {
  name: string
  id: string
  created_at: Date
  author: string
  summary: string
  cover_url: string
  total_pages: number
}

type BookWithRatings = Awaited<
  ReturnType<typeof prisma.book.findMany>
>[number] & {
  ratings: {
    id: string
    rate: number
    description: string
    created_at: Date
    book_id: string
    user_id: string
  }[]
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category')

    const books = await prisma.book.findMany({
      where: {
        ...(categoryId
          ? {
              categories: {
                some: {
                  categoryId,
                },
              },
            }
          : {}),
      },
      include: {
        ratings: true,
      },
    })

    const booksAvgRating = await prisma.rating.groupBy({
      by: ['book_id'],
      _avg: {
        rate: true,
      },
    })

    let userBooksIds: string[] = []

    const session = await getServerSession(authOptions)

    if (session) {
      const userBooks = await prisma.book.findMany({
        where: {
          ratings: {
            some: {
              user_id: String(session?.user?.id),
            },
          },
        },
      })

      userBooksIds = userBooks?.map((book: Book) => book.id)
    }

    const booksWithAvgRating = books.map((book: BookWithRatings) => {
      const bookAvgRating = booksAvgRating.find(
        (avgRating: RatingGroupByResult) => avgRating.book_id === book.id,
      )
      const { ratings /* ...bookInfo */ } = book

      return {
        ...book,
        ratings: ratings.length,
        avgRating: bookAvgRating?._avg.rate || 0,
        alreadyRead: userBooksIds.includes(book.id),
      }
    })

    return NextResponse.json({ books: booksWithAvgRating })
  } catch (error) {
    console.error('Error fetching books', error)
    return NextResponse.json(
      { error: 'Failed to search books' },
      { status: 500 },
    )
  }
}
