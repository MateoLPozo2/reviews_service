'use client'

import { useState, useEffect } from 'react'
import { ReviewCard } from './review-card'
import { Pagination } from './pagination'
import { ExportButton } from './export-button'
import type { Review, SearchFilters } from '@/types/review'

const ITEMS_PER_PAGE = 6

export function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<SearchFilters & { query: string }>({
    query: '',
  })

  useEffect(() => {
    fetchReviews()
  }, [filters])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      if (filters.query) params.set('q', filters.query)
      if (filters.domain) params.set('domain', filters.domain)
      if (filters.year) params.set('year', filters.year)
      if (filters.tags?.length) params.set('tags', filters.tags.join(','))

      const response = await fetch(`/api/reviews?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch reviews')
      
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setReviews([])
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedReviews = reviews.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Search Results Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Research Reviews</h2>
          <div className="flex items-center space-x-4">
            <ExportButton reviews={reviews} />
          </div>
        </div>
        <p className="text-gray-600">
          Discover comprehensive reviews of cutting-edge academic research, curated for accessibility and professional insight.
        </p>
        
        {/* Search Stats */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing <span className="font-medium text-gray-900">{reviews.length}</span> reviews
          </span>
        </div>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or browse all available reviews.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {paginatedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={reviews.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}