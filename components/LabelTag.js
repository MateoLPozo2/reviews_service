// components/LabelTag.js
export default function LabelTag({ label }) {
  return (
    <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-black dark:bg-gray-800 dark:text-white">
      {label}
    </span>
  );
}