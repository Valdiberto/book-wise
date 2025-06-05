import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { authOptions } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { bookId: string } },
) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({ status: 401 })

  try {
    const bookId = params.bookId
    const userId = String(session?.user?.id)

    const body = await req.json()

    const bodySchema = z.object({
      description: z.string().max(450),
      rate: z.number().min(1).max(5),
    })

    const { description, rate } = bodySchema.parse(body)

    const userAlreadyRate = await prisma.rating.findFirst({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    })
    if (userAlreadyRate) {
      return NextResponse.json(
        { error: 'You already rate this book' },
        { status: 400 },
      )
    }

    await prisma.rating.create({
      data: {
        book_id: bookId,
        description,
        rate,
        user_id: userId,
      },
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create rating' },
      { status: 400 },
    )
  }
}
