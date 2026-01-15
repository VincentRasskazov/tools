import { useState } from 'react';

export default function RGBToHex() {
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);

  const toHex = (n) => {
    const hex = Math.max(0, Math.min(255, parseInt(n) || 0)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-100 to-purple-200">
      <h2 className="text-4xl font-extrabold mb-6 text-violet-700 drop-shadow">RGB to Hex Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Red (0-255)</label>
            <input
              type="number"
              min="0"
              max="255"
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="w-full px-4 py-2 border-2 border-violet-300 rounded-lg focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Green (0-255)</label>
            <input
              type="number"
              min="0"
              max="255"
              value={g}
              onChange={(e) => setG(e.target.value)}
              className="w-full px-4 py-2 border-2 border-violet-300 rounded-lg focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Blue (0-255)</label>
            <input
              type="number"
              min="0"
              max="255"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full px-4 py-2 border-2 border-violet-300 rounded-lg focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hex Color</label>
          <input
            type="text"
            value={hex}
            readOnly
            className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono"
          />
        </div>
        <div className="w-full h-24 rounded-lg" style={{ backgroundColor: hex }} />
      </div>
    </div>
  );
}
