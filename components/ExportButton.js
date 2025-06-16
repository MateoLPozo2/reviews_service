// components/ExportButton.js
export default function ExportButton({ filename = 'review', contentRef }) {
  const handleExportPDF = async () => {
    if (!contentRef.current) return;
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: 0.5,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(contentRef.current).save();
  };

  const handleExportMarkdown = () => {
    if (!contentRef.current) return;

    const markdownText = contentRef.current.innerText;
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.md`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportPDF}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Export PDF
      </button>
      <button
        onClick={handleExportMarkdown}
        className="px-4 py-2 text-sm bg-gray-200 text-black rounded hover:bg-gray-300"
      >
        Download .md
      </button>
    </div>
  );
}