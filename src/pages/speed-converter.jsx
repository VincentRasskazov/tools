import { useState } from 'react';

export default function SpeedConverter() {
  const [values, setValues] = useState({
    mps: '',
    kph: '',
    mph: '',
    knots: '',
    fps: ''
  });

  const conversions = {
    mps: 1,
    kph: 3.6,
    mph: 2.23694,
    knots: 1.94384,
    fps: 3.28084
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      setValues({
        mps: '',
        kph: '',
        mph: '',
        knots: '',
        fps: ''
      });
      return;
    }

    const mps = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (mps * conversions[key]).toFixed(6).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  const labels = {
    mps: 'Meters per Second (m/s)',
    kph: 'Kilometers per Hour (km/h)',
    mph: 'Miles per Hour (mph)',
    knots: 'Knots',
    fps: 'Feet per Second (ft/s)'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow">Speed Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-3">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{labels[unit]}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
