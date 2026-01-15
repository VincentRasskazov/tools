import { useState } from 'react';

export default function PalindromeChecker() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const check = () => {
    const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    setResult(cleaned === reversed && cleaned.length > 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-emerald-200">
      <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow">Palindrome Checker</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to check..."
          className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 mb-4"
        />
        <button
          onClick={check}
          className="w-full px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition mb-4"
        >
          Check
        </button>
        {result !== null && (
          <div className={`p-6 rounded-lg text-center ${result ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-6xl mb-2`}>{result ? '✓' : '✗'}</div>
            <div className={`text-xl font-bold ${result ? 'text-green-600' : 'text-red-600'}`}>
              {result ? 'Is a Palindrome!' : 'Not a Palindrome'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
