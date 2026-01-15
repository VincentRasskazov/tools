import { useState } from 'react';

export default function RomanNumeralConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('toRoman');

  const toRoman = (num) => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let result = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i];
        num -= values[i];
      }
    }
    return result;
  };

  const fromRoman = (str) => {
    const values = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      const current = values[str[i]];
      const next = values[str[i + 1]];
      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };

  const convert = () => {
    if (mode === 'toRoman') {
      const num = parseInt(input);
      if (num > 0 && num < 4000) {
        setOutput(toRoman(num));
      } else {
        setOutput('Enter a number between 1-3999');
      }
    } else {
      setOutput(fromRoman(input.toUpperCase()).toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-orange-200">
      <h2 className="text-4xl font-extrabold mb-6 text-red-700 drop-shadow">Roman Numeral Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('toRoman')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${mode === 'toRoman' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            To Roman
          </button>
          <button
            onClick={() => setMode('fromRoman')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${mode === 'fromRoman' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            From Roman
          </button>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'toRoman' ? 'Enter number (1-3999)' : 'Enter Roman numeral'}
          className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500 mb-4 text-center text-xl"
        />
        <button
          onClick={convert}
          className="w-full px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition mb-4"
        >
          Convert
        </button>
        {output && (
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600">{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}
