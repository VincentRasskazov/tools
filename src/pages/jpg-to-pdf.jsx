export default function JPGtoPDF() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow">JPG to PDF</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-4">🖼️➡️📄</div>
        <p className="text-gray-600 mb-4">
          JPG to PDF conversion requires specialized libraries. This feature would need a PDF generation library.
        </p>
        <div className="text-sm text-gray-500">
          In a production app, use libraries like jsPDF or pdfmake
        </div>
      </div>
    </div>
  );
}
