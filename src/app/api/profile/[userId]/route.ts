import { prisma } from '@/lib/prisma'
import { getMostFrequentString } from '@/utils/getMostFrequentString'
import { NextResponse } from 'next/server'

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

    const profile = await prisma.user.findUnique({
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
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const readPages = profile?.ratings.reduce(
      (acc, rating) => acc + rating.book.total_pages,
      0,
    )

    const ratedBooks = profile?.ratings?.length
    const readAuthors = profile?.ratings.reduce((acc, rating) => {
      if (!acc.includes(rating.book.author)) {
        acc.push(rating.book.author)
      }
      return acc
    }, [] as string[])

    const categories = profile.ratings.flatMap((rating) =>
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
