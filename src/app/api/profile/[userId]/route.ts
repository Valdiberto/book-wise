import { prisma } from '@/lib/prisma'
import { getMostFrequentString } from '@/utils/getMostFrequentString'
import { NextResponse } from 'next/server'

type RatingWithBook = {
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

type UserProfile = {
  id: string
  avatar_url: string | null
  name: string | null
  created_at: Date
  ratings: RatingWithBook[]
}

export async function GET(
  request: Request,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await context.params
    console.log('user id log', userId)

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required and must be a valid string' },
        { status: 400 },
      )
    }

    const profile = (await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        ratings: {
          include: {
            book: {
              include: {
                categories: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    })) as UserProfile | null

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const readPages = profile?.ratings.reduce(
      (acc: number, rating: RatingWithBook) => acc + rating.book.total_pages,
      0,
    )

    const ratedBooks = profile?.ratings?.length
    const readAuthors = profile?.ratings.reduce(
      (acc: string[], rating: RatingWithBook) => {
        if (!acc.includes(rating.book.author)) {
          acc.push(rating.book.author)
        }
        return acc
      },
      [] as string[],
    )

    const categories = profile.ratings.flatMap((rating: RatingWithBook) =>
      rating.book.categories.flatMap((category) => category.category.name),
    )

    const mostReadCategory =
      categories.length > 0 ? getMostFrequentString(categories) : null

    const profileData = {
      user: {
        avatar_url: profile?.avatar_url,
        name: profile?.name,
        member_since: profile?.created_at,
      },
      ratings: profile?.ratings,
      readPages,
      ratedBooks,
      readAuthors: readAuthors?.length,
      mostReadCategory,
    }
    return NextResponse.json({ profile: profileData })
  } catch (error) {
    console.error('Error fetching user profile', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
