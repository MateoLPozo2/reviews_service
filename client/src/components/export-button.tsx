import { useState } from "react";
import { Download, FileText, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Review } from "@/types/review";

interface ExportButtonProps {
  reviews: Review[];
  className?: string;
}

export function ExportButton({ reviews, className = "" }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Trigger browser's print dialog for PDF export
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const exportToMarkdown = () => {
    setIsExporting(true);
    try {
      const markdown = reviews.map(review => {
        return `# ${review.title}

**Authors:** ${review.authors.join(', ')}
**Domain:** ${review.domain}
**DOI:** ${review.doi}
**Version:** ${review.version}
**Last Updated:** ${new Date(review.lastUpdated).toLocaleDateString()}
**Reading Time:** ${review.estimatedReadingTime} minutes
**Word Count:** ${review.wordCount.toLocaleString()}

## Summary

${review.reviewSummary}

## Content

${review.content}

---

`;
      }).join('\n');

      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mlp-reviews-${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    setIsExporting(true);
    try {
      const jsonData = {
        exported_at: new Date().toISOString(),
        platform: "MLP Research",
        review_count: reviews.length,
        reviews: reviews.map(review => ({
          ...review,
          exported_metadata: {
            citation: `${review.authors.join(', ')} (${new Date(review.lastUpdated).getFullYear()}). ${review.title}. MLP Research Reviews. DOI: ${review.doi}`,
            permalink: `https://mlp-research.com/mlp/reviews/${review.nid}/${review.slug}`
          }
        }))
      };

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mlp-reviews-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={className}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export Reviews"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToMarkdown}>
          <FileText className="h-4 w-4 mr-2" />
          Export as Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <Database className="h-4 w-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}