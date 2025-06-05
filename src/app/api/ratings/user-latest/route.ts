import { getServerSession } from 'next-auth'

import { prisma } from '@/lib/prisma'

import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const latestUserRating = await prisma.rating.findMany({
      where: {
        user_id: String(session.user.id),
      },

      orderBy: {
        created_at: 'desc',
      },
      include: {
        book: true,
      },
      take: 10,
    })

    return NextResponse.json(latestUserRating)
  } catch (error) {
    console.error('Error fetching latest user ratings:', error)
    return NextResponse.json(
      { error: 'Falha ao buscar avaliações do usuário' },
      { status: 500 },
    )
  }
}
