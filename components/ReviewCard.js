// components/ReviewCard.js
import Link from 'next/link';

export default function ReviewCard({ review }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-md transition">
      <Link href={`/mlp/reviews/${review.nid}/${review.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
        {review.title}
      </Link>
      <p className="text-sm text-gray-600">By {review.authors}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {review.labels.map(label => (
          <span key={label} className="text-xs px-2 py-0.5 bg-gray-100 rounded">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}