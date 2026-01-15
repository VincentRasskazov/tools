import { useState } from 'react';

export default function WeightConverter() {
  const [values, setValues] = useState({
    kilograms: '',
    grams: '',
    milligrams: '',
    pounds: '',
    ounces: '',
    tons: ''
  });

  const conversions = {
    kilograms: 1,
    grams: 1000,
    milligrams: 1000000,
    pounds: 2.20462,
    ounces: 35.274,
    tons: 0.001
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      setValues({
        kilograms: '',
        grams: '',
        milligrams: '',
        pounds: '',
        ounces: '',
        tons: ''
      });
      return;
    }

    const kg = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (kg * conversions[key]).toFixed(6).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <h2 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">Weight Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-3">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">{unit}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
