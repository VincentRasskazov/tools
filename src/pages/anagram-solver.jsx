import { useState } from 'react';

export default function AnagramSolver() {
  const [text, setText] = useState('');
  const [anagram, setAnagram] = useState('');

  const generateAnagram = () => {
    const chars = text.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    setAnagram(chars.join(''));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200">
      <h2 className="text-4xl font-extrabold mb-6 text-orange-700 drop-shadow">Anagram Solver</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 mb-4"
        />
        <button
          onClick={generateAnagram}
          className="w-full px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition mb-4"
        >
          Generate Anagram
        </button>
        {anagram && (
          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <div className="text-sm text-gray-600 mb-2">Anagram:</div>
            <div className="text-3xl font-bold text-orange-600">{anagram}</div>
          </div>
        )}
      </div>
    </div>
  );
}
