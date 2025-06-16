import { Link } from "wouter";
import { Clock, User, FileText, Tag, Share, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
  showHighlights?: boolean;
  highlightedContent?: {
    title?: string;
    summary?: string;
  };
}

export function ReviewCard({ review, showHighlights = false, highlightedContent }: ReviewCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const title = showHighlights && highlightedContent?.title 
    ? highlightedContent.title 
    : review.title;

  const summary = showHighlights && highlightedContent?.summary 
    ? highlightedContent.summary 
    : review.reviewSummary;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        {/* Review Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link href={`/mlp/reviews/${review.nid}/${review.slug}`}>
              <h3 
                className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 cursor-pointer transition-colors"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Link>
            <p 
              className="text-gray-600 text-sm mb-3 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </div>
          <div className="ml-4 flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80" 
              alt="Academic research illustration" 
              className="w-20 h-14 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{review.authors.join(', ')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{review.estimatedReadingTime} min read</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            <span>{review.wordCount.toLocaleString()} words</span>
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            <span>{review.domain}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {review.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>
              DOI: 
              <a 
                href={`https://doi.org/${review.doi}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium ml-1"
              >
                {review.doi}
              </a>
            </span>
            <span>v{review.version}</span>
            <span>Updated {formatDate(review.lastUpdated)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Link href={`/mlp/reviews/${review.nid}/${review.slug}`}>
              <Button size="sm">
                Read Review
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
