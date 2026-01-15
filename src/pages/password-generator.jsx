import { useState } from 'react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const generatePassword = () => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 to-teal-200">
      <h2 className="text-4xl font-extrabold mb-6 text-emerald-700 drop-shadow">Password Generator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 rounded-lg font-mono text-center text-lg"
            placeholder="Generated password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Length: {length}</label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="space-y-2 mb-6">
          <label className="flex items-center">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="mr-2" />
            <span className="text-gray-700">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="mr-2" />
            <span className="text-gray-700">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="mr-2" />
            <span className="text-gray-700">Numbers (0-9)</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="mr-2" />
            <span className="text-gray-700">Symbols (!@#$...)</span>
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={generatePassword}
            className="flex-1 px-6 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600 transition"
          >
            Generate
          </button>
          {password && (
            <button
              onClick={copyToClipboard}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
