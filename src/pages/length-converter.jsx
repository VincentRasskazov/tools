import { useState } from 'react';

export default function LengthConverter() {
  const [values, setValues] = useState({
    meters: '',
    kilometers: '',
    centimeters: '',
    millimeters: '',
    miles: '',
    yards: '',
    feet: '',
    inches: ''
  });

  const conversions = {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    miles: 0.000621371,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      setValues({
        meters: '',
        kilometers: '',
        centimeters: '',
        millimeters: '',
        miles: '',
        yards: '',
        feet: '',
        inches: ''
      });
      return;
    }

    const meters = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (meters * conversions[key]).toFixed(6).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200">
      <h2 className="text-4xl font-extrabold mb-6 text-teal-700 drop-shadow">Length Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-3">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">{unit}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
