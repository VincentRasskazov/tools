import { useState } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const months = parseFloat(years) * 12;

    if (principal && monthlyRate && months) {
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      setResult({ monthlyPayment, totalPayment, totalInterest });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow">Loan Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="5.5"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Term (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="10"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition mb-4"
        >
          Calculate
        </button>
        {result && (
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Monthly Payment</div>
              <div className="text-2xl font-bold text-blue-600">${result.monthlyPayment.toFixed(2)}</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Payment</div>
              <div className="text-xl font-bold text-indigo-600">${result.totalPayment.toFixed(2)}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Interest</div>
              <div className="text-xl font-bold text-purple-600">${result.totalInterest.toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
