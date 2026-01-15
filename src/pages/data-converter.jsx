import { useState } from 'react';

export default function DataConverter() {
  const [values, setValues] = useState({
    bytes: '',
    kilobytes: '',
    megabytes: '',
    gigabytes: '',
    terabytes: '',
    bits: ''
  });

  const conversions = {
    bytes: 1,
    kilobytes: 1/1024,
    megabytes: 1/(1024*1024),
    gigabytes: 1/(1024*1024*1024),
    terabytes: 1/(1024*1024*1024*1024),
    bits: 8
  };

  const handleChange = (unit, value) => {
    if (value === '' || isNaN(value)) {
      const emptyValues = {};
      Object.keys(conversions).forEach(key => emptyValues[key] = '');
      setValues(emptyValues);
      return;
    }

    const bytes = parseFloat(value) / conversions[unit];
    const newValues = {};
    Object.keys(conversions).forEach(key => {
      newValues[key] = (bytes * conversions[key]).toFixed(6).replace(/\.?0+$/, '');
    });
    setValues(newValues);
  };

  const labels = {
    bytes: 'Bytes (B)',
    kilobytes: 'Kilobytes (KB)',
    megabytes: 'Megabytes (MB)',
    gigabytes: 'Gigabytes (GB)',
    terabytes: 'Terabytes (TB)',
    bits: 'Bits'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">
      <h2 className="text-4xl font-extrabold mb-6 text-slate-700 drop-shadow">Data Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-3">
          {Object.keys(conversions).map(unit => (
            <div key={unit}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{labels[unit]}</label>
              <input
                type="number"
                value={values[unit]}
                onChange={(e) => handleChange(unit, e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
