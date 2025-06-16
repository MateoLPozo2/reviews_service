import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, Share, Printer, ExternalLink, Clock, User, FileText, Tag, Calendar } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VersionBadge } from "@/components/version-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownRenderer } from "@/lib/markdown-renderer";
import { Review } from "@/types/review";

export default function ReviewDetail() {
  const params = useParams<{ nid: string; slug: string }>();
  
  const { data: review, isLoading, error } = useQuery<Review>({
    queryKey: [`/api/reviews/${params.nid}/${params.slug}`],
    enabled: !!(params.nid && params.slug),
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && review) {
      try {
        await navigator.share({
          title: review.title,
          text: review.reviewSummary,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Not Found</h2>
            <p className="text-gray-600 mb-4">The requested review could not be found.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reviews
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8 border-b">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex space-x-4 mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="p-8">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-40 w-full mb-4" />
            </div>
          </div>
        ) : review ? (
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Review Header */}
            <div className="p-8 border-b">
              <div className="flex items-center mb-4">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="mr-4">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Reviews
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    Published
                  </Badge>
                  <VersionBadge review={review} />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{review.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{review.authors.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{review.estimatedReadingTime} min read</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
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
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Updated {formatDate(review.lastUpdated)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {review.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary-50 text-primary-700">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">{review.reviewSummary}</p>
            </div>

            {/* Review Content */}
            <div className="p-8">
              <MarkdownRenderer 
                content={review.content}
                className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
              />

              {/* Review Footer */}
              <div className="mt-12 pt-8 border-t">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Citation Information</h3>
                  <div className="bg-white rounded border p-4 font-mono text-sm text-gray-800 mb-4">
                    {review.authors.join(', ')} ({new Date(review.lastUpdated).getFullYear()}). {review.title}. <em>MLP Research Reviews</em>. DOI: {review.doi}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span>Original Paper:</span>
                      <a 
                        href={`https://doi.org/${review.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium ml-1"
                      >
                        View Source
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
