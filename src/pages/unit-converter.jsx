import { useState } from 'react';

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [from, setFrom] = useState('meters');
  const [to, setTo] = useState('feet');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const conversions = {
    length: {
      meters: 1, feet: 3.28084, inches: 39.3701, kilometers: 0.001, miles: 0.000621371
    },
    weight: {
      kilograms: 1, pounds: 2.20462, ounces: 35.274, grams: 1000
    },
    temperature: {
      celsius: (v, to) => to === 'fahrenheit' ? v * 9/5 + 32 : to === 'kelvin' ? v + 273.15 : v
    }
  };

  const convert = () => {
    const val = parseFloat(input);
    if (isNaN(val)) return;
    
    const units = conversions[category];
    if (category === 'temperature') {
      setOutput(units.celsius(val, to).toFixed(2));
    } else {
      const inBase = val / units[from];
      const result = inBase * units[to];
      setOutput(result.toFixed(4));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 drop-shadow">Unit Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="length">Length</option>
              <option value="weight">Weight</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Value</label>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                {Object.keys(conversions[category]).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                {Object.keys(conversions[category]).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={convert}
            className="w-full px-6 py-2 rounded-lg bg-indigo-500 text-white font-semibold shadow hover:bg-indigo-600 transition"
          >
            Convert
          </button>
          {output && (
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-indigo-600">{output}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
