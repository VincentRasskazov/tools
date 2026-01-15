import { useState } from 'react';

export default function NumberToWords() {
  const [number, setNumber] = useState('');
  const [words, setWords] = useState('');

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  const convertToWords = (num) => {
    if (num === 0) return 'zero';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' ' + convertToWords(num % 100) : '');
    if (num < 1000000) return convertToWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 ? ' ' + convertToWords(num % 1000) : '');
    return 'Number too large';
  };

  const convert = () => {
    const num = parseInt(number);
    if (!isNaN(num) && num >= 0) {
      setWords(convertToWords(num));
    } else {
      setWords('Invalid number');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 drop-shadow">Number to Words</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
          className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 mb-4 text-center text-2xl font-mono"
        />
        <button
          onClick={convert}
          className="w-full px-6 py-2 rounded-lg bg-indigo-500 text-white font-semibold shadow hover:bg-indigo-600 transition mb-4"
        >
          Convert to Words
        </button>
        {words && (
          <div className="bg-indigo-50 p-6 rounded-lg text-center">
            <div className="text-xl font-semibold text-indigo-600 capitalize">{words}</div>
          </div>
        )}
      </div>
    </div>
  );
}
