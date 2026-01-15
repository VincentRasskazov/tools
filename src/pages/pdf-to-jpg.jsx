export default function PDFtoJPG() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-orange-200">
      <h2 className="text-4xl font-extrabold mb-6 text-red-700 drop-shadow">PDF to JPG</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-4">📄➡️🖼️</div>
        <p className="text-gray-600 mb-4">
          PDF to JPG conversion requires specialized libraries. This feature would need a backend service or browser-based PDF library.
        </p>
        <div className="text-sm text-gray-500">
          In a production app, use libraries like pdf.js or pdfjs-dist
        </div>
      </div>
    </div>
  );
}
