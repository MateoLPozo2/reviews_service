import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SidebarFilters } from "@/components/sidebar-filters";
import { ReviewCard } from "@/components/review-card";
import { ExportButton } from "@/components/export-button";
import { Pagination } from "@/components/pagination";
import { SearchAnalyticsProvider } from "@/components/search-analytics";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, X } from "lucide-react";
import { Review, SearchFilters } from "@/types/review";
import { fuseSearch } from "@/lib/fuse-search";

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters & { query: string }>({
    query: "",
  });

  // Fetch all reviews
  const { data: allReviews = [], isLoading, error } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  // Initialize Fuse search when reviews are loaded
  useEffect(() => {
    if (allReviews.length > 0) {
      fuseSearch.initialize(allReviews);
    }
  }, [allReviews]);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let results: Array<{ review: Review; highlighted?: any }> = [];

    // If there's a search query, use Fuse.js
    if (filters.query.trim()) {
      const searchResults = fuseSearch.search(filters.query);
      results = searchResults.map(result => ({
        review: result.item,
        highlighted: {
          title: fuseSearch.highlightMatches(result.item.title, result.matches || []),
          summary: fuseSearch.highlightMatches(result.item.reviewSummary, result.matches || []),
        }
      }));
    } else {
      results = allReviews.map(review => ({ review }));
    }

    // Apply additional filters
    if (filters.domain) {
      results = results.filter(({ review }) => review.domain === filters.domain);
    }

    if (filters.year) {
      results = results.filter(({ review }) => {
        const reviewYear = new Date(review.lastUpdated).getFullYear().toString();
        return reviewYear === filters.year;
      });
    }

    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(({ review }) =>
        filters.tags!.some(tag => review.tags.includes(tag))
      );
    }

    if (filters.readingTime) {
      results = results.filter(({ review }) => {
        const time = review.estimatedReadingTime;
        switch (filters.readingTime) {
          case "quick":
            return time < 10;
          case "medium":
            return time >= 10 && time <= 20;
          case "long":
            return time > 20;
          default:
            return true;
        }
      });
    }

    // Sort results
    results.sort(({ review: a }, { review: b }) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "reading-time":
          return a.estimatedReadingTime - b.estimatedReadingTime;
        default:
          return 0;
      }
    });

    return results;
  }, [allReviews, filters, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = filteredAndSortedReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const allFilteredReviews = filteredAndSortedReviews.map(item => item.review);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Reviews</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-center"
              >
                {showFilters ? <X className="h-4 w-4 mr-2" /> : <Menu className="h-4 w-4 mr-2" />}
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            <div className={showFilters ? "block" : "hidden lg:block"}>
              <SidebarFilters onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            
            {/* Search Results Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Research Reviews</h2>
                <div className="flex items-center space-x-4">
                  <ExportButton reviews={allFilteredReviews} />
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical</SelectItem>
                        <SelectItem value="reading-time">Reading Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                Discover comprehensive reviews of cutting-edge academic research, curated for accessibility and professional insight.
              </p>
              
              {/* Search Stats */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                  Showing <span className="font-medium text-gray-900">{filteredAndSortedReviews.length}</span> reviews
                  {filteredAndSortedReviews.length !== allReviews.length && (
                    <span className="ml-1">
                      (filtered from {allReviews.length} total)
                    </span>
                  )}
                </span>
                {isLoading && (
                  <span>Loading...</span>
                )}
              </div>
            </div>

            {/* Reviews Grid */}
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex space-x-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredAndSortedReviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all available reviews.
                </p>
                <Button onClick={() => setFilters({ query: "" })}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {paginatedReviews.map(({ review, highlighted }) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      showHighlights={!!highlighted}
                      highlightedContent={highlighted}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={filteredAndSortedReviews.length}
                      itemsPerPage={ITEMS_PER_PAGE}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>

      {/* Search Analytics Provider */}
      <SearchAnalyticsProvider 
        query={filters.query}
        filters={filters}
        resultsCount={filteredAndSortedReviews.length}
      />

      <Footer />
    </div>
  );
}
