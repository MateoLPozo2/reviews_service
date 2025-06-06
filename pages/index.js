import { useState } from 'react';
import Link from 'next/link';
import reviews from '@/data/reviews';

export default function Home() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const uniqueTags = [...new Set(reviews.flatMap((r) => r.labels))];

  const filteredReviews = reviews.filter((r) => {
    const matchesTag = selectedTag ? r.labels.includes(selectedTag) : true;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">All Reviews</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
      />

      {/* Tag filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === null
              ? 'bg-black text-white'
              : 'bg-gray-200 hover:bg-gray-300'
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
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-300'
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
              {review.title}
            </Link>
            <p className="text-sm text-gray-600">{review.authors}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {review.labels.map((label) => (
                <span
                  key={label}
                  className="px-2 py-0.5 text-xs bg-gray-100 rounded"
                >
                  {label}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}