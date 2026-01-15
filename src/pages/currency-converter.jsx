import { useState } from 'react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState('');

  // Mock exchange rates
  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    AUD: 1.52,
    CAD: 1.36,
    INR: 83.12
  };

  const convert = () => {
    const amountInUSD = parseFloat(amount) / rates[from];
    const converted = amountInUSD * rates[to];
    setResult(converted.toFixed(2));
  };

  const currencies = Object.keys(rates);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <h2 className="text-4xl font-extrabold mb-6 text-amber-700 drop-shadow">Currency Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
              >
                {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
              >
                {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={convert}
          className="w-full px-6 py-2 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition mb-4"
        >
          Convert
        </button>
        {result && (
          <div className="bg-amber-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-amber-600">{result} {to}</div>
          </div>
        )}
      </div>
    </div>
  );
}
