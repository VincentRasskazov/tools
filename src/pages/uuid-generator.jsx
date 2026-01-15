import { useState } from 'react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200">
      <h2 className="text-4xl font-extrabold mb-6 text-teal-700 drop-shadow">UUID Generator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 w-24"
          />
          <button
            onClick={generate}
            className="flex-1 px-6 py-2 rounded-lg bg-teal-500 text-white font-semibold shadow hover:bg-teal-600 transition"
          >
            Generate UUID{count > 1 ? 's' : ''}
          </button>
          {uuids.length > 1 && (
            <button
              onClick={copyAll}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
            >
              Copy All
            </button>
          )}
        </div>
        {uuids.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-mono text-sm">{uuid}</span>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className="px-3 py-1 bg-teal-500 text-white rounded text-sm hover:bg-teal-600"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
