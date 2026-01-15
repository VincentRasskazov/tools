import { useState } from 'react';

export default function VolumeConverter() {
  const [values, setValues] = useState({
    liters: '',
    milliliters: '',
    cubicMeters: '',
    gallons: '',
    quarts: '',
    pints: '',
    cups: '',
    fluidOunces: ''
  });

  const conversions = {
    liters: 1,
    milliliters: 1000,
    cubicMeters: 0.001,
    gallons: 0.264172,
    quarts: 1.05669,
    pints: 2.11338,
    cups: 4.22675,
    fluidOunces: 33.814
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      const emptyValues = {};
      Object.keys(conversions).forEach(key => emptyValues[key] = '');
      setValues(emptyValues);
      return;
    }

    const liters = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (liters * conversions[key]).toFixed(6).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  const labels = {
    liters: 'Liters (L)',
    milliliters: 'Milliliters (mL)',
    cubicMeters: 'Cubic Meters (m³)',
    gallons: 'Gallons (US)',
    quarts: 'Quarts (US)',
    pints: 'Pints (US)',
    cups: 'Cups (US)',
    fluidOunces: 'Fluid Ounces (US)'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200">
      <h2 className="text-4xl font-extrabold mb-6 text-cyan-700 drop-shadow">Volume Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="space-y-3">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{labels[unit]}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
