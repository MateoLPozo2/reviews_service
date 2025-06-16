// components/BackToList.js
import Link from "next/link";

export default function BackToList() {
  return (
    <div className="mb-4">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to all reviews
      </Link>
    </div>
  );
}