// pages/upload-test.js
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

export default function UploadTestPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Test</h1>
      <ImageUploader onFileSelect={setSelectedFile} />
      {selectedFile && (
        <p className="text-gray-700 text-sm mt-2">Selected file: {selectedFile.name}</p>
      )}
    </div>
  );
}