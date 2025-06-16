import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export async function GET() {
  try {
    const tags = await storage.getAllTags()
    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}