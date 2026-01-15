import { useState } from 'react';

export default function PercentageCalculator() {
  const [value, setValue] = useState('');
  const [percent, setPercent] = useState('');

  const result = (parseFloat(value) * parseFloat(percent) / 100) || 0;
  const increase = parseFloat(value) + result || 0;
  const decrease = parseFloat(value) - result || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <h2 className="text-4xl font-extrabold mb-6 text-amber-700 drop-shadow">Percentage Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Percentage (%)</label>
            <input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="20"
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">{percent}% of {value} is:</div>
            <div className="text-3xl font-bold text-amber-600">{result.toFixed(2)}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">{value} + {percent}%:</div>
            <div className="text-2xl font-bold text-orange-600">{increase.toFixed(2)}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">{value} - {percent}%:</div>
            <div className="text-2xl font-bold text-red-600">{decrease.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
