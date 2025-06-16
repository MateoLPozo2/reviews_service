'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from './search-bar'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import type { SearchFilters } from '@/types/review'

interface SearchFiltersProps {
  onFiltersChange?: (filters: SearchFilters & { query: string }) => void
  className?: string
}

export function SearchFilters({ onFiltersChange, className = "" }: SearchFiltersProps) {
  const [query, setQuery] = useState<string>("")
  const [selectedDomain, setSelectedDomain] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedReadingTime, setSelectedReadingTime] = useState<string>("")
  const [domains, setDomains] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    fetchDomains()
    fetchTags()
  }, [])

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        query,
        domain: selectedDomain && selectedDomain !== "all" ? selectedDomain : undefined,
        year: selectedYear && selectedYear !== "all" ? selectedYear : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        readingTime: selectedReadingTime || undefined,
      })
    }
  }, [query, selectedDomain, selectedYear, selectedTags, selectedReadingTime, onFiltersChange])

  const fetchDomains = async () => {
    try {
      const response = await fetch('/api/domains')
      if (response.ok) {
        const data = await response.json()
        setDomains(data)
      }
    } catch (error) {
      console.error('Error fetching domains:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags')
      if (response.ok) {
        const data = await response.json()
        setTags(data)
      }
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleClearFilters = () => {
    setQuery("")
    setSelectedDomain("all")
    setSelectedYear("all")
    setSelectedTags([])
    setSelectedReadingTime("")
  }

  const hasActiveFilters = query || selectedDomain !== "all" || selectedYear !== "all" || selectedTags.length > 0 || selectedReadingTime

  const popularTags = tags.slice(0, 12)

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 sticky top-24 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Reviews
        </label>
        <SearchBar
          onSearch={setQuery}
          initialValue={query}
        />
      </div>

      {/* Domain Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Domain
        </label>
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
          <SelectTrigger>
            <SelectValue placeholder="All Domains" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            {domains.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year
        </label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Popular Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Time Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reading Time
        </label>
        <Select value={selectedReadingTime} onValueChange={setSelectedReadingTime}>
          <SelectTrigger>
            <SelectValue placeholder="Any Length" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Length</SelectItem>
            <SelectItem value="quick">Quick Read (&lt; 10 min)</SelectItem>
            <SelectItem value="medium">Medium (10-20 min)</SelectItem>
            <SelectItem value="long">Long Read (&gt; 20 min)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}