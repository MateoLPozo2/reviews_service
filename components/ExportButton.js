// components/ExportButton.js
import { useRef } from 'react';

export default function ExportButton({ filename = 'review', contentRef }) {
  const handleExport = async () => {
    if (!contentRef.current) return;

    const html2pdf = (await import('html2pdf.js')).default;

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