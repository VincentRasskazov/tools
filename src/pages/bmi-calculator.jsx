import { useState } from 'react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m
    if (w > 0 && h > 0) {
      const result = (w / (h * h)).toFixed(1);
      setBMI(result);
    }
  };

  const getCategory = () => {
    if (!bmi) return '';
    const value = parseFloat(bmi);
    if (value < 18.5) return { text: 'Underweight', color: 'text-blue-600' };
    if (value < 25) return { text: 'Normal weight', color: 'text-green-600' };
    if (value < 30) return { text: 'Overweight', color: 'text-yellow-600' };
    return { text: 'Obese', color: 'text-red-600' };
  };

  const category = getCategory();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-emerald-200">
      <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow">BMI Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="70"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="175"
            />
          </div>
        </div>
        <button
          onClick={calculateBMI}
          className="w-full px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition mb-4"
        >
          Calculate BMI
        </button>
        {bmi && (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-gray-800 mb-2">{bmi}</div>
            <div className={`text-xl font-semibold ${category.color}`}>{category.text}</div>
          </div>
        )}
      </div>
    </div>
  );
}
