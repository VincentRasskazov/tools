import { useState } from 'react';

export default function PrimeNumberChecker() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const isPrime = (n) => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const check = () => {
    const num = parseInt(number);
    if (isNaN(num)) {
      setResult(null);
      return;
    }
    setResult(isPrime(num));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow">Prime Number Checker</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number..."
          className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4 text-center text-2xl font-mono"
        />
        <button
          onClick={check}
          className="w-full px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition mb-4"
        >
          Check
        </button>
        {result !== null && (
          <div className={`p-6 rounded-lg text-center ${result ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-6xl mb-2`}>{result ? '✓' : '✗'}</div>
            <div className={`text-xl font-bold ${result ? 'text-green-600' : 'text-red-600'}`}>
              {result ? `${number} is Prime!` : `${number} is Not Prime`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
