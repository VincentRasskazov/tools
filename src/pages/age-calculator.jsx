import { useState } from 'react';

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthdate) return;
    
    const birth = new Date(birthdate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    
    setAge({ years, months, days, totalDays, totalMonths });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 drop-shadow">Age Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          onClick={calculateAge}
          className="w-full px-6 py-2 rounded-lg bg-indigo-500 text-white font-semibold shadow hover:bg-indigo-600 transition mb-4"
        >
          Calculate Age
        </button>
        {age && (
          <div className="space-y-3">
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <div className="text-4xl font-bold text-indigo-600">{age.years}</div>
              <div className="text-sm text-gray-600">Years Old</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{age.months}</div>
                <div className="text-xs text-gray-600">Months</div>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-cyan-600">{age.days}</div>
                <div className="text-xs text-gray-600">Days</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{age.totalMonths}</div>
                <div className="text-xs text-gray-600">Total Months</div>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-pink-600">{age.totalDays}</div>
                <div className="text-xs text-gray-600">Total Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
