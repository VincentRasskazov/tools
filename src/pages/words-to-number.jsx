import { useState } from 'react';

export default function WordsToNumber() {
  const [words, setWords] = useState('');
  const [number, setNumber] = useState('');

  const wordValues = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
    seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, thousand: 1000
  };

  const convert = () => {
    try {
      const tokens = words.toLowerCase().split(/[\s-]+/);
      let result = 0;
      let current = 0;

      tokens.forEach(token => {
        const value = wordValues[token];
        if (value >= 1000) {
          result += current * value;
          current = 0;
        } else if (value === 100) {
          current *= value;
        } else {
          current += value;
        }
      });

      setNumber((result + current).toString());
    } catch {
      setNumber('Invalid input');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <h2 className="text-4xl font-extrabold mb-6 text-pink-700 drop-shadow">Words to Number</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <input
          type="text"
          value={words}
          onChange={(e) => setWords(e.target.value)}
          placeholder="e.g., twenty three"
          className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:border-pink-500 mb-4 text-center"
        />
        <button
          onClick={convert}
          className="w-full px-6 py-2 rounded-lg bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition mb-4"
        >
          Convert to Number
        </button>
        {number && (
          <div className="bg-pink-50 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold font-mono text-pink-600">{number}</div>
          </div>
        )}
      </div>
    </div>
  );
}
