// components/SearchBar.js
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title or content..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
    />
  );
}