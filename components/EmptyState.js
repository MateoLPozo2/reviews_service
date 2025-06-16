// components/EmptyState.js
export default function EmptyState({ query }) {
  return (
    <div className="text-center text-gray-400 p-6">
      <p>No results found for <strong>{query}</strong>.</p>
      <p>Try a different keyword or remove filters.</p>
    </div>
  );
}