import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchBar } from "./search-bar";
import { SearchFilters } from "@/types/review";
import { Badge } from "@/components/ui/badge";

interface SidebarFiltersProps {
  onFiltersChange: (filters: SearchFilters & { query: string }) => void;
  className?: string;
}

export function SidebarFilters({ onFiltersChange, className = "" }: SidebarFiltersProps) {
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedReadingTime, setSelectedReadingTime] = useState<string>("");

  // Fetch domains and tags
  const { data: domains = [] } = useQuery<string[]>({
    queryKey: ["/api/domains"],
  });

  const { data: tags = [] } = useQuery<string[]>({
    queryKey: ["/api/tags"],
  });

  // Update filters when any filter changes
  useEffect(() => {
    onFiltersChange({
      query,
      domain: selectedDomain && selectedDomain !== "all" ? selectedDomain : undefined,
      year: selectedYear && selectedYear !== "all" ? selectedYear : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      readingTime: selectedReadingTime || undefined,
    });
  }, [query, selectedDomain, selectedYear, selectedTags, selectedReadingTime, onFiltersChange]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedDomain("all");
    setSelectedYear("all");
    setSelectedTags([]);
    setSelectedReadingTime("");
  };

  const hasActiveFilters = query || selectedDomain || selectedYear || selectedTags.length > 0 || selectedReadingTime;

  const popularTags = (tags as string[]).slice(0, 12); // Show first 12 tags

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
            {(domains as string[]).map((domain: string) => (
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
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reading Time Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reading Time
        </label>
        <div className="space-y-2">
          {[
            { value: "quick", label: "Quick Read (< 10 min)" },
            { value: "medium", label: "Medium (10-20 min)" },
            { value: "long", label: "Deep Dive (> 20 min)" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={selectedReadingTime === option.value}
                onCheckedChange={(checked) => {
                  setSelectedReadingTime(checked ? option.value : "");
                }}
              />
              <label
                htmlFor={option.value}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Popular Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag: string) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-primary-600 hover:bg-primary-700"
                    : "hover:bg-primary-100 hover:text-primary-700"
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="bg-primary-600 cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
