import { useState } from 'react';

export default function MortgageCalculator() {
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const homePrice = parseFloat(price);
    const downPayment = parseFloat(down);
    const principal = homePrice - downPayment;
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const months = parseFloat(years) * 12;

    if (principal > 0 && monthlyRate && months) {
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      setResult({ monthlyPayment, totalPayment, totalInterest, principal });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-teal-700 drop-shadow">Mortgage Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Home Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
              placeholder="300000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Down Payment ($)</label>
            <input
              type="number"
              value={down}
              onChange={(e) => setDown(e.target.value)}
              className="w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
              placeholder="60000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
              placeholder="3.5"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Term (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
              placeholder="30"
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
          <div className="space-y-2">
            <div className="bg-teal-50 p-3 rounded-lg flex justify-between">
              <span className="text-sm text-gray-600">Monthly Payment:</span>
              <span className="font-bold text-teal-600">${result.monthlyPayment.toFixed(2)}</span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg flex justify-between">
              <span className="text-sm text-gray-600">Loan Amount:</span>
              <span className="font-bold text-green-600">${result.principal.toFixed(2)}</span>
            </div>
            <div className="bg-cyan-50 p-3 rounded-lg flex justify-between">
              <span className="text-sm text-gray-600">Total Payment:</span>
              <span className="font-bold text-cyan-600">${result.totalPayment.toFixed(2)}</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg flex justify-between">
              <span className="text-sm text-gray-600">Total Interest:</span>
              <span className="font-bold text-blue-600">${result.totalInterest.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
