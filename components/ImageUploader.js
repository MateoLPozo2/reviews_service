// components/ImageUploader.js
import { useState } from "react";
import Image from 'next/image';

export default function ImageUploader({ onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, PNG, or WEBP files are allowed.");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {preview && (
        <div className="mt-2">
          <Image
            src={previewUrl}
            alt="preview"
            width={128}
            height={128}
            className="rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
