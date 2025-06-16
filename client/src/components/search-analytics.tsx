import { useEffect } from "react";
import { Review, SearchFilters } from "@/types/review";

interface SearchAnalytics {
  query: string;
  filters: SearchFilters;
  resultsCount: number;
  timestamp: number;
}

const ANALYTICS_KEY = 'mlp_search_analytics';
const MAX_STORED_SEARCHES = 100;

export function useSearchAnalytics() {
  const logSearch = (query: string, filters: SearchFilters, resultsCount: number) => {
    try {
      const analytics: SearchAnalytics = {
        query: query.trim(),
        filters,
        resultsCount,
        timestamp: Date.now()
      };

      const stored = localStorage.getItem(ANALYTICS_KEY);
      const history: SearchAnalytics[] = stored ? JSON.parse(stored) : [];
      
      // Add new search and keep only recent ones
      history.unshift(analytics);
      const trimmed = history.slice(0, MAX_STORED_SEARCHES);
      
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmed));
    } catch (error) {
      // Silent fail for localStorage issues
      console.debug('Analytics logging failed:', error);
    }
  };

  const getSearchHistory = (): SearchAnalytics[] => {
    try {
      const stored = localStorage.getItem(ANALYTICS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const getPopularSearchTerms = (limit = 10): Array<{ term: string; count: number }> => {
    const history = getSearchHistory();
    const termCounts = new Map<string, number>();

    history.forEach(search => {
      if (search.query) {
        const terms = search.query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
        terms.forEach(term => {
          termCounts.set(term, (termCounts.get(term) || 0) + 1);
        });
      }
    });

    return Array.from(termCounts.entries())
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  const getFilterUsage = () => {
    const history = getSearchHistory();
    const usage = {
      domain: 0,
      year: 0,
      tags: 0,
      readingTime: 0,
      total: history.length
    };

    history.forEach(search => {
      if (search.filters.domain) usage.domain++;
      if (search.filters.year) usage.year++;
      if (search.filters.tags?.length) usage.tags++;
      if (search.filters.readingTime) usage.readingTime++;
    });

    return usage;
  };

  return {
    logSearch,
    getSearchHistory,
    getPopularSearchTerms,
    getFilterUsage
  };
}

interface SearchAnalyticsProviderProps {
  query: string;
  filters: SearchFilters;
  resultsCount: number;
}

export function SearchAnalyticsProvider({ query, filters, resultsCount }: SearchAnalyticsProviderProps) {
  const { logSearch } = useSearchAnalytics();

  useEffect(() => {
    // Only log meaningful searches
    if (query.length > 0 || Object.values(filters).some(v => v)) {
      const timeoutId = setTimeout(() => {
        logSearch(query, filters, resultsCount);
      }, 1000); // Debounce logging

      return () => clearTimeout(timeoutId);
    }
  }, [query, filters, resultsCount, logSearch]);

  return null; // This is a provider component, no UI
}