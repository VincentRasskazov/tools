import { useState } from 'react';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState([]);

  const generate = () => {
    const newNumbers = [];
    for (let i = 0; i < count; i++) {
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      newNumbers.push(random);
    }
    setNumbers(newNumbers);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-fuchsia-100 to-purple-200">
      <h2 className="text-4xl font-extrabold mb-6 text-fuchsia-700 drop-shadow">Random Number Generator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border-2 border-fuchsia-300 rounded-lg focus:outline-none focus:border-fuchsia-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                className="w-full px-4 py-2 border-2 border-fuchsia-300 rounded-lg focus:outline-none focus:border-fuchsia-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Count</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-2 border-2 border-fuchsia-300 rounded-lg focus:outline-none focus:border-fuchsia-500"
            />
          </div>
        </div>
        <button
          onClick={generate}
          className="w-full px-6 py-2 rounded-lg bg-fuchsia-500 text-white font-semibold shadow hover:bg-fuchsia-600 transition mb-4"
        >
          Generate
        </button>
        {numbers.length > 0 && (
          <div className="bg-fuchsia-50 p-6 rounded-lg">
            <div className="text-center text-4xl font-bold text-fuchsia-600 mb-4">
              {numbers.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
