import { useState } from 'react';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const original = parseFloat(price) || 0;
  const discountPercent = parseFloat(discount) || 0;
  const savings = original * (discountPercent / 100);
  const final = original - savings;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-200">
      <h2 className="text-4xl font-extrabold mb-6 text-red-700 drop-shadow">Discount Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="100.00"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="25"
            />
          </div>
        </div>
        <div className="space-y-3 bg-red-50 p-6 rounded-lg">
          <div className="flex justify-between text-lg">
            <span className="text-gray-700">Original Price:</span>
            <span className="font-bold">${original.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-700">You Save ({discountPercent}%):</span>
            <span className="font-bold text-green-600">-${savings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl border-t-2 border-red-200 pt-3">
            <span className="text-gray-800 font-semibold">Final Price:</span>
            <span className="font-bold text-red-600">${final.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
