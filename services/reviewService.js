// services/reviewService.js
import reviews from '@/data/reviews';

export function getReviewById(nid) {
  return reviews.find(r => r.nid === parseInt(nid));
}

export function getAllReviews() {
  return reviews;
}

export function addReview(newReview) {
  reviews.push(newReview);
  // Additional logic for saving to a database can be added here
}

export function updateReview(nid, updatedFields) {
  const reviewIndex = reviews.findIndex(r => r.nid === parseInt(nid));
  if (reviewIndex !== -1) {
    reviews[reviewIndex] = { ...reviews[reviewIndex], ...updatedFields };
  }
}

export function deleteReview(nid) {
  const reviewIndex = reviews.findIndex(r => r.nid === parseInt(nid));
  if (reviewIndex !== -1) {
    reviews.splice(reviewIndex, 1);
  }
}