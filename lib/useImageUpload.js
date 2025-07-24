// lib/useImageUpload.js
import { useState } from "react";

export function useImageUpload(validTypes = ["image/jpeg", "image/png", "image/webp"]) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (!validTypes.includes(f.type)) {
      setError("Unsupported file format.");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  };

  return { file, preview, error, handleUpload };
}