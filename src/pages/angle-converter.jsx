import { useState } from 'react';

export default function AngleConverter() {
  const [values, setValues] = useState({
    degrees: '',
    radians: '',
    gradians: '',
    turns: ''
  });

  const conversions = {
    degrees: 1,
    radians: Math.PI / 180,
    gradians: 10/9,
    turns: 1/360
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      setValues({
        degrees: '',
        radians: '',
        gradians: '',
        turns: ''
      });
      return;
    }

    const degrees = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (degrees * conversions[key]).toFixed(8).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  const labels = {
    degrees: 'Degrees (°)',
    radians: 'Radians (rad)',
    gradians: 'Gradians (grad)',
    turns: 'Turns'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-100 to-purple-200">
      <h2 className="text-4xl font-extrabold mb-6 text-violet-700 drop-shadow">Angle Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{labels[unit]}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-violet-300 rounded-lg focus:outline-none focus:border-violet-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
