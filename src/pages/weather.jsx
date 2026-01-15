import { useState } from 'react';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = () => {
    // Mock weather data since we don't have an API key
    const mockData = {
      city: city,
      temp: Math.floor(Math.random() * 30) + 10,
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
      wind: Math.floor(Math.random() * 20) + 5
    };
    setWeather(mockData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow">Weather</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={getWeather}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
          >
            Get Weather
          </button>
        </div>
        {weather && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{weather.city}</div>
              <div className="text-6xl font-bold text-blue-600 my-4">{weather.temp}°C</div>
              <div className="text-xl text-gray-600">{weather.condition}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="text-2xl font-bold text-blue-600">{weather.humidity}%</div>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600">Wind</div>
                <div className="text-2xl font-bold text-cyan-600">{weather.wind} km/h</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center">* Mock data for demonstration</div>
          </div>
        )}
      </div>
    </div>
  );
}
