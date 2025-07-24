// /components/ReviewMeta.js
import { format } from "date-fns";
import { useState } from "react";
import ExportButton from "./ExportButton";

function ReviewMeta({ review, contentRef }) {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedPath, setUploadedPath] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      alert(`Uploaded: ${selectedFile.name}`);
      setUploadedPath(result.path); // new state to store public path
    } catch (error) {
      alert("Error uploading file.");
    }

    setShowUpload(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 mb-4 text-sm text-gray-600 border-b pb-3 gap-4">
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

        <div className="mt-3 flex flex-wrap gap-2">
          <ExportButton filename={review.slug} contentRef={contentRef} />
        </div>
      </div>

      <div className="mt-3 sm:mt-0 space-y-2 text-right">
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          {showUpload ? "Cancel" : "Upload Image"}
        </button>

        {showUpload && (
          <div className="mt-2 space-y-2">
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
            {previewUrl && (
              <img src={previewUrl} alt="preview" className="h-32 rounded shadow" />
            )}
            {selectedFile && (
              <button
                onClick={handleUpload}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Confirm Upload
              </button>
            )}
            {uploadedPath && (
              <div className="flex items-center space-x-2 mt-2">
                <img src={uploadedPath} alt="uploaded" className="w-6 h-6 object-cover rounded" />
                <span className="text-xs text-gray-500">{uploadedPath}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewMeta;