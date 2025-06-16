// pages/index.js
import { useState } from "react";
import { useFilteredReviews } from "@/lib/useFilteredReviews";
import ReviewList from "@/components/ReviewList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const reviews = useFilteredReviews(query, selectedTag);
  const allTags = [...new Set(reviews.flatMap((r) => r.labels))];

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">All Reviews</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
      />

      {/* Tag filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === null ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              selectedTag === tag ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <ReviewList reviews={reviews} query={query} />
    </div>
  );
}