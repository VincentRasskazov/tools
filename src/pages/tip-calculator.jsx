import { useState } from 'react';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const billAmount = parseFloat(bill) || 0;
  const tipAmount = billAmount * (tipPercent / 100);
  const total = billAmount + tipAmount;
  const perPerson = people > 0 ? total / people : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-emerald-700 drop-shadow">Tip Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bill Amount ($)</label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="w-full px-4 py-2 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tip: {tipPercent}%</label>
            <input
              type="range"
              min="0"
              max="30"
              value={tipPercent}
              onChange={(e) => setTipPercent(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>30%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of People</label>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
        <div className="space-y-3 bg-emerald-50 p-4 rounded-lg">
          <div className="flex justify-between">
            <span className="text-gray-700">Tip Amount:</span>
            <span className="font-bold text-emerald-600">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Total:</span>
            <span className="font-bold text-emerald-600">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t-2 border-emerald-200 pt-2">
            <span className="text-gray-700">Per Person:</span>
            <span className="font-bold text-xl text-emerald-700">${perPerson.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
