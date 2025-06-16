// /components/ReviewMeta.js
import ExportButton from "@/components/ExportButton";
import { format } from "date-fns";

function ReviewMeta({ review }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 mb-4 text-sm text-gray-600 border-b pb-3">
      <div className="space-y-1">
        <p>
          <strong>Authors:</strong> {review.authors}
        </p>
        <p>
          <strong>Created:</strong> {format(new Date(review.createdAt), "PPP")}
          {" · "}
          <strong>Updated:</strong> {format(new Date(review.updatedAt), "PPP")}
        </p>
        <div className="flex flex-wrap gap-1">
          {review.labels.map((label) => (
            <span
              key={label}
              className="px-2 py-0.5 text-xs rounded bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 sm:mt-0">
        <ExportButton review={review} />
      </div>
    </div>
  );
}

export default ReviewMeta;
