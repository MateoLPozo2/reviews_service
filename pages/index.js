import Link from 'next/link';
import reviews from '@/data/reviews';

export default function Home() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">All Reviews</h1>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.nid} className="border-b pb-2">
            <Link
              href={`/mlp/reviews/${review.nid}/${review.slug}`}
              className="text-blue-600 hover:underline"
            >
              {review.title}
            </Link>
            <p className="text-sm text-gray-600">{review.authors}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}