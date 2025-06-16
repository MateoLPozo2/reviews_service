// components/ReviewCard.js
import Link from "next/link";

export default function ReviewCard({ review, query }) {
  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <li className="border-b pb-2">
      <Link href={`/mlp/reviews/${review.nid}/${review.slug}`} className="text-blue-600 hover:underline">
        <span dangerouslySetInnerHTML={{ __html: highlightMatch(review.title) }} />
      </Link>
      <p
        className="text-sm text-gray-600"
        dangerouslySetInnerHTML={{ __html: highlightMatch(review.authors) }}
      />
      <div className="flex flex-wrap gap-1 mt-1">
        {review.labels.map((label) => (
          <span key={label} className="px-2 py-0.5 text-xs bg-gray-100 rounded">
            {label}
          </span>
        ))}
      </div>
    </li>
  );
}