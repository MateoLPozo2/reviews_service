export interface Review {
  id: number;
  nid: string;
  title: string;
  slug: string;
  reviewSummary: string;
  content: string;
  authors: string[];
  doi: string;
  domain: string;
  tags: string[];
  version: string;
  lastUpdated: Date | string;
  wordCount: number;
  estimatedReadingTime: number;
  reviewAuthor?: string | null;
  impactMetrics?: Record<string, any> | null;
  reuseLicense?: string | null;
  sourceAttribution?: string | null;
  published: number;
  createdAt: Date | string;
}

export interface SearchFilters {
  domain?: string;
  year?: string;
  tags?: string[];
  readingTime?: string;
}
