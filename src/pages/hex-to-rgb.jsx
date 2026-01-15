import { useState } from 'react';

export default function HexToRGB() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('rgb(59, 130, 246)');

  const convert = (hexValue) => {
    setHex(hexValue);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      setRgb(`rgb(${r}, ${g}, ${b})`);
    } else {
      setRgb('Invalid hex color');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <h2 className="text-4xl font-extrabold mb-6 text-pink-700 drop-shadow">Hex to RGB Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hex Color</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => convert(e.target.value)}
            className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:border-pink-500 font-mono"
            placeholder="#3b82f6"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">RGB Color</label>
          <input
            type="text"
            value={rgb}
            readOnly
            className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono"
          />
        </div>
        <div className="w-full h-24 rounded-lg" style={{ backgroundColor: hex }} />
      </div>
    </div>
  );
}
