import { useState } from 'react';

export default function AreaConverter() {
  const [values, setValues] = useState({
    sqMeters: '',
    sqKilometers: '',
    sqCentimeters: '',
    sqMiles: '',
    sqYards: '',
    sqFeet: '',
    acres: '',
    hectares: ''
  });

  const conversions = {
    sqMeters: 1,
    sqKilometers: 0.000001,
    sqCentimeters: 10000,
    sqMiles: 3.861e-7,
    sqYards: 1.19599,
    sqFeet: 10.7639,
    acres: 0.000247105,
    hectares: 0.0001
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      const emptyValues = {};
      Object.keys(conversions).forEach(key => emptyValues[key] = '');
      setValues(emptyValues);
      return;
    }

    const sqm = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (sqm * conversions[key]).toFixed(8).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  const labels = {
    sqMeters: 'Square Meters (m²)',
    sqKilometers: 'Square Kilometers (km²)',
    sqCentimeters: 'Square Centimeters (cm²)',
    sqMiles: 'Square Miles (mi²)',
    sqYards: 'Square Yards (yd²)',
    sqFeet: 'Square Feet (ft²)',
    acres: 'Acres',
    hectares: 'Hectares'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-teal-200">
      <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow">Area Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="space-y-3">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{labels[unit]}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
