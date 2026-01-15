import { useState } from 'react';

export default function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb = hexToRgb(color);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-pink-200">
      <h2 className="text-4xl font-extrabold mb-6 text-rose-700 drop-shadow">Color Picker</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-32 rounded-lg cursor-pointer"
          />
        </div>
        <div
          className="w-full h-24 rounded-lg mb-6 shadow-inner"
          style={{ backgroundColor: color }}
        />
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="font-semibold text-gray-700">HEX:</span>
            <span className="font-mono">{color}</span>
            <button
              onClick={() => copyToClipboard(color)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
          {rgb && (
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-semibold text-gray-700">RGB:</span>
              <span className="font-mono">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
              <button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
