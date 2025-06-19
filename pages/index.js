// pages/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import reviews from "@/data/reviews";
import Fuse from "fuse.js";

export default function Home() {
  const router = useRouter();
  const { tag } = router.query;

  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Set tag from URL if present
  useEffect(() => {
    setSelectedTag(tag ?? null);
  }, [tag]);

  const fuse = new Fuse(reviews, {
    keys: ["title", "authors", "content"],
    threshold: 0.3,
  });

  const rawResults = searchQuery
    ? fuse.search(searchQuery)
    : reviews.map((r) => ({ item: r }));

  const filteredReviews = rawResults
    .map((r) => r.item)
    .filter((r) => (selectedTag ? r.labels.includes(selectedTag) : true));

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  const uniqueTags = [
    ...new Set(reviews.flatMap((r) => r.labels)),
  ];

  // Tag button navigation
  const handleTagClick = (tagName) => {
    setSelectedTag(tagName);
    if (tagName) {
      router.push(`/?tag=${encodeURIComponent(tagName)}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">All Reviews</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title, author, or content..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
      />

      {/* Tag filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleTagClick(null)}
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
            onClick={() => handleTagClick(tag)}
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

      {/* Review list */}
      <ul className="space-y-4">
        {filteredReviews.map((review) => (
          <li key={review.nid} className="border-b pb-2">
            <Link
              href={`/mlp/reviews/${review.nid}/${review.slug}`}
              className="text-blue-600 hover:underline"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(review.title, searchQuery),
                }}
              />
            </Link>
            <p
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html: highlightMatch(review.authors, searchQuery),
              }}
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {review.labels.map((label) => (
                // Tag chip is clickable
                <button
                  key={label}
                  type="button"
                  onClick={() => handleTagClick(label)}
                  className={`px-2 py-0.5 text-xs rounded transition ${
                    selectedTag === label
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-gray-100 hover:bg-blue-200 text-black"
                  }`}
                  style={{
                    border: selectedTag === label ? "1px solid #0070f3" : "",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}