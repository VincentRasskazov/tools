import { useState, useEffect } from 'react';

export default function IPLookup() {
  const [ip, setIp] = useState('');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // Get user's IP on load
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('Unable to fetch IP'));
  }, []);

  const lookup = () => {
    // Mock IP info since we're avoiding external APIs
    setInfo({
      ip: ip,
      country: 'United States',
      region: 'California',
      city: 'San Francisco',
      isp: 'Example ISP',
      timezone: 'America/Los_Angeles'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-teal-200">
      <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow">IP Lookup</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 font-mono"
          />
        </div>
        <button
          onClick={lookup}
          className="w-full px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition mb-4"
        >
          Lookup
        </button>
        {info && (
          <div className="space-y-2">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">IP Address</div>
              <div className="font-mono font-bold text-green-600">{info.ip}</div>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Location</div>
              <div className="font-semibold">{info.city}, {info.region}, {info.country}</div>
            </div>
            <div className="bg-cyan-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">ISP</div>
              <div className="font-semibold">{info.isp}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Timezone</div>
              <div className="font-semibold">{info.timezone}</div>
            </div>
            <div className="text-xs text-gray-500 text-center">* Mock data for demonstration</div>
          </div>
        )}
      </div>
    </div>
  );
}
