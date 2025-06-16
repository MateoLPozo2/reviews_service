// components/ReviewMeta.js
export default function ReviewMeta({ createdAt, updatedAt, createdBy, updatedBy }) {
  return (
    <div className="text-xs text-gray-500 mt-1">
      <p>Created: {createdAt} by {createdBy}</p>
      <p>Updated: {updatedAt} by {updatedBy}</p>
    </div>
  );
}