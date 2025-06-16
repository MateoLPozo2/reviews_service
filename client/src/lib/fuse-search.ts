import Fuse from 'fuse.js';
import { Review } from '@/types/review';

const fuseOptions = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'reviewSummary', weight: 2 },
    { name: 'content', weight: 1 },
    { name: 'authors', weight: 2 },
    { name: 'tags', weight: 2 },
    { name: 'domain', weight: 1.5 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

export class FuseSearchService {
  private fuse: Fuse<Review> | null = null;

  initialize(reviews: Review[]) {
    this.fuse = new Fuse(reviews, fuseOptions);
  }

  search(query: string): Fuse.FuseResult<Review>[] {
    if (!this.fuse || !query.trim()) {
      return [];
    }
    return this.fuse.search(query);
  }

  highlightMatches(text: string, matches: readonly Fuse.FuseResultMatch[]): string {
    if (!matches || matches.length === 0) {
      return text;
    }

    const relevantMatches = matches.filter(match => 
      match.key === 'title' || match.key === 'reviewSummary'
    );

    if (relevantMatches.length === 0) {
      return text;
    }

    let highlightedText = text;
    const sortedIndices = relevantMatches
      .flatMap(match => match.indices || [])
      .sort((a, b) => b[0] - a[0]); // Sort in reverse order to avoid index shifting

    sortedIndices.forEach(([start, end]) => {
      const before = highlightedText.slice(0, start);
      const highlighted = highlightedText.slice(start, end + 1);
      const after = highlightedText.slice(end + 1);
      highlightedText = `${before}<mark class="bg-yellow-200 px-1 rounded">${highlighted}</mark>${after}`;
    });

    return highlightedText;
  }
}

export const fuseSearch = new FuseSearchService();
