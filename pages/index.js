// pages/index.js
import { useState } from "react";
import Fuse from "fuse.js";
import reviews from "@/data/reviews";
import ReviewCard from "@/components/ReviewCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const fuse = new Fuse(reviews, {
    keys: ["title", "authors", "content"],
    threshold: 0.3,
  });

  const rawResults = searchQuery
    ? fuse.search(searchQuery)
    : reviews.map((r) => ({ item: r }));

  const filtered = rawResults
    .map((r) => r.item)
    .filter((r) => (selectedTag ? r.labels.includes(selectedTag) : true));

  const uniqueTags = [...new Set(reviews.flatMap((r) => r.labels))];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Reviews</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title..."
        className="w-full max-w-md mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === null
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              selectedTag === tag
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((review) => (
          <ReviewCard key={review.nid} review={review} />
        ))}
      </div>
    </div>
  );
}