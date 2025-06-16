// components/ExportButton.js
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function ExportButton({ filename = 'review', contentRef }) {
  const handleExport = () => {
    if (!contentRef.current) return;

    const opt = {
      margin:       0.5,
      filename:     `${filename}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(contentRef.current).save();
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Export as PDF
    </button>
  );
}