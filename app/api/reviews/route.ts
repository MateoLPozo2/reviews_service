import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const domain = searchParams.get('domain') || undefined
    const year = searchParams.get('year') || undefined
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || undefined
    
    let reviews
    if (query || domain || year || tags) {
      reviews = await storage.searchReviews(query, { domain, year, tags })
    } else {
      reviews = await storage.getPublishedReviews()
    }
    
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const review = await storage.createReview(body)
    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}