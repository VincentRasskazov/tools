import { useState } from 'react';

export default function DaysBetweenDates() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const months = Math.floor(diffDays / 30.44);
    const years = Math.floor(diffDays / 365.25);
    
    setResult({ days: diffDays, weeks, months, years });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200">
      <h2 className="text-4xl font-extrabold mb-6 text-teal-700 drop-shadow">Days Between Dates</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Date</label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Second Date</label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full px-6 py-2 rounded-lg bg-teal-500 text-white font-semibold shadow hover:bg-teal-600 transition mb-4"
        >
          Calculate
        </button>
        {result && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-teal-50 p-4 rounded-lg text-center col-span-2">
              <div className="text-4xl font-bold text-teal-600">{result.days}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-cyan-600">{result.weeks}</div>
              <div className="text-sm text-gray-600">Weeks</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{result.months}</div>
              <div className="text-sm text-gray-600">Months</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
