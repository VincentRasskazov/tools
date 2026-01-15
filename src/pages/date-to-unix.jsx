import { useState } from 'react';

export default function DateToUnix() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('00:00');
  const [unix, setUnix] = useState('');

  const convert = () => {
    if (!date) return;
    const dateTime = new Date(`${date}T${time}`);
    setUnix(Math.floor(dateTime.getTime() / 1000));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <h2 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">Date to Unix Timestamp</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
        <button
          onClick={convert}
          className="w-full px-6 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition mb-4"
        >
          Convert to Unix
        </button>
        {unix && (
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold font-mono text-purple-600">{unix}</div>
            <div className="text-sm text-gray-600 mt-2">Unix Timestamp</div>
          </div>
        )}
      </div>
    </div>
  );
}
