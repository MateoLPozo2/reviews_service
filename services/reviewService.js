// services/reviewService.js
import reviews from '@/data/reviews';

export function getReviewById(nid) {
  return reviews.find(r => r.nid === parseInt(nid));
}