import { useState, useEffect } from 'react';

export default function WorldClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cities = [
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <h2 className="text-4xl font-extrabold mb-6 text-sky-700 drop-shadow">World Clock</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cities.map(city => (
            <div key={city.zone} className="bg-sky-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">{city.name}</div>
              <div className="text-2xl font-mono font-bold text-sky-600">
                {time.toLocaleTimeString('en-US', { timeZone: city.zone, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-sm text-gray-600">
                {time.toLocaleDateString('en-US', { timeZone: city.zone })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
