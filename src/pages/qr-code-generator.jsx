import { useState, useRef, useEffect } from 'react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const canvasRef = useRef(null);

  const generateQR = () => {
    if (!text) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 300;
    const moduleSize = 10;
    const modules = size / moduleSize;
    
    canvas.width = size;
    canvas.height = size;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = 'black';
    const data = text.split('').map(c => c.charCodeAt(0));
    
    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        const index = (y * modules + x) % data.length;
        if ((data[index] + x + y) % 3 === 0) {
          ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    
    setQrCode(canvas.toDataURL());
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <h2 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">QR Code Generator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL..."
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 mb-4 h-24 resize-none"
        />
        <button
          onClick={generateQR}
          className="w-full px-6 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition mb-4"
        >
          Generate QR Code
        </button>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {qrCode && (
          <div className="text-center">
            <img src={qrCode} alt="QR Code" className="mx-auto mb-4 border-4 border-purple-200 rounded-lg" />
            <button
              onClick={downloadQR}
              className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
