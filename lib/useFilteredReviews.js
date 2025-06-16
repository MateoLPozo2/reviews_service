// lib/useFilteredReviews.js
import Fuse from "fuse.js";
import reviews from "@/data/reviews";

export function useFilteredReviews(query, selectedTag) {
  const fuse = new Fuse(reviews, {
    keys: ["title", "authors", "content"],
    threshold: 0.3,
  });

  const rawResults = query
    ? fuse.search(query).map((r) => r.item)
    : [...reviews];

  return rawResults.filter((r) => (selectedTag ? r.labels.includes(selectedTag) : true));
}