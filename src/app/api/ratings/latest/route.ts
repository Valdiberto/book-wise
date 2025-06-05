import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const ratings = await prisma.rating.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        book: true,
        user: true,
      },
      take: 10,
    })

    if (!ratings) {
      return NextResponse.json({ error: 'ratings not found' }, { status: 404 })
    }

    return NextResponse.json(ratings)
  } catch (error) {
    console.error('Error fetching ratings:', error)
    return NextResponse.json(
      { error: 'Falha ao buscar avaliações' },
      { status: 500 },
    )
  }
}
