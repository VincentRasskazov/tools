import { useState } from 'react';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');

  const handleCelsiusChange = (e) => {
    const c = e.target.value;
    setCelsius(c);
    if (c === '' || isNaN(c)) {
      setFahrenheit('');
      setKelvin('');
    } else {
      const num = parseFloat(c);
      setFahrenheit(((num * 9/5) + 32).toFixed(2));
      setKelvin((num + 273.15).toFixed(2));
    }
  };

  const handleFahrenheitChange = (e) => {
    const f = e.target.value;
    setFahrenheit(f);
    if (f === '' || isNaN(f)) {
      setCelsius('');
      setKelvin('');
    } else {
      const num = parseFloat(f);
      const c = (num - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const handleKelvinChange = (e) => {
    const k = e.target.value;
    setKelvin(k);
    if (k === '' || isNaN(k)) {
      setCelsius('');
      setFahrenheit('');
    } else {
      const num = parseFloat(k);
      const c = num - 273.15;
      setCelsius(c.toFixed(2));
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-red-200">
      <h2 className="text-4xl font-extrabold mb-6 text-red-700 drop-shadow">Temperature Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Celsius (°C)</label>
            <input
              type="number"
              value={celsius}
              onChange={handleCelsiusChange}
              className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fahrenheit (°F)</label>
            <input
              type="number"
              value={fahrenheit}
              onChange={handleFahrenheitChange}
              className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="32"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kelvin (K)</label>
            <input
              type="number"
              value={kelvin}
              onChange={handleKelvinChange}
              className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="273.15"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
