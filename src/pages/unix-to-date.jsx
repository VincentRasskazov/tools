import { useState } from 'react';

export default function UnixToDate() {
  const [unix, setUnix] = useState('');
  const [date, setDate] = useState('');

  const convert = () => {
    if (!unix) return;
    const d = new Date(parseInt(unix) * 1000);
    setDate(d.toLocaleString());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-red-200">
      <h2 className="text-4xl font-extrabold mb-6 text-rose-700 drop-shadow">Unix to Date Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Unix Timestamp</label>
          <input
            type="number"
            value={unix}
            onChange={(e) => setUnix(e.target.value)}
            placeholder="1609459200"
            className="w-full px-4 py-2 border-2 border-rose-300 rounded-lg focus:outline-none focus:border-rose-500 font-mono"
          />
        </div>
        <button
          onClick={convert}
          className="w-full px-6 py-2 rounded-lg bg-rose-500 text-white font-semibold shadow hover:bg-rose-600 transition mb-4"
        >
          Convert to Date
        </button>
        {date && (
          <div className="bg-rose-50 p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-rose-600">{date}</div>
            <div className="text-sm text-gray-600 mt-2">Local Date & Time</div>
          </div>
        )}
      </div>
    </div>
  );
}
