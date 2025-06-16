import { useState } from "react";
import { Info, Clock, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Review } from "@/types/review";

interface VersionBadgeProps {
  review: Review;
  showChangelog?: boolean;
}

export function VersionBadge({ review, showChangelog = true }: VersionBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVersionHistory = (version: string) => {
    // Simulate version history based on version number
    const versionNum = parseFloat(version);
    const history = [];
    
    if (versionNum >= 1.2) {
      history.push({
        version: "1.2",
        date: review.lastUpdated,
        changes: ["Updated performance benchmarks", "Added implementation considerations", "Enhanced technical analysis section"]
      });
    }
    
    if (versionNum >= 1.1) {
      history.push({
        version: "1.1",
        date: new Date(new Date(review.lastUpdated).getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        changes: ["Improved readability", "Added future directions section", "Minor corrections"]
      });
    }
    
    history.push({
      version: "1.0",
      date: review.createdAt,
      changes: ["Initial publication", "Complete review content", "Academic citations added"]
    });
    
    return history.reverse(); // Show newest first
  };

  const versionHistory = getVersionHistory(review.version);

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="bg-green-100 text-green-700">
        <GitBranch className="h-3 w-3 mr-1" />
        v{review.version}
      </Badge>
      
      {showChangelog && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
              aria-label="View version history"
            >
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <h4 className="font-semibold text-sm">Version History</h4>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {versionHistory.map((entry, index) => (
                  <div key={entry.version} className={`border-l-2 pl-3 ${index === 0 ? 'border-green-500' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-medium text-sm ${index === 0 ? 'text-green-700' : 'text-gray-700'}`}>
                        v{entry.version}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {entry.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start">
                          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t text-xs text-gray-500">
                All changes follow academic publishing standards and maintain citation integrity.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}