// components/ReviewList.js
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews, query }) {
  if (!reviews.length) return <p className="text-gray-500">No results found.</p>;

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <ReviewCard key={r.nid} review={r} query={query} />
      ))}
    </ul>
  );
}