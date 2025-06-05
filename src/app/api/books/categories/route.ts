import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching category', error)
    return NextResponse.json(
      { error: 'Failed to find category' },
      { status: 500 },
    )
  }
}
