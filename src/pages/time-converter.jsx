import { useState } from 'react';

export default function TimeConverter() {
  const [values, setValues] = useState({
    seconds: '',
    minutes: '',
    hours: '',
    days: '',
    weeks: '',
    months: '',
    years: ''
  });

  const conversions = {
    seconds: 1,
    minutes: 1/60,
    hours: 1/3600,
    days: 1/86400,
    weeks: 1/604800,
    months: 1/2592000,
    years: 1/31536000
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      const emptyValues = {};
      Object.keys(conversions).forEach(key => emptyValues[key] = '');
      setValues(emptyValues);
      return;
    }

    const seconds = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (seconds * conversions[key]).toFixed(6).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <h2 className="text-4xl font-extrabold mb-6 text-amber-700 drop-shadow">Time Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-3">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">{unit}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
