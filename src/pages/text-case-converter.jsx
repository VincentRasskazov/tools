import { useState } from 'react';

export default function TextCaseConverter() {
  const [text, setText] = useState('');

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
  };
  const toSentenceCase = () => {
    setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
  };
  const toggleCase = () => {
    setText(text.split('').map(char => {
      return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    }).join(''));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-amber-200">
      <h2 className="text-4xl font-extrabold mb-6 text-yellow-700 drop-shadow">Text Case Converter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 h-48 mb-4 resize-none"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            onClick={toUpperCase}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 transition"
          >
            UPPERCASE
          </button>
          <button
            onClick={toLowerCase}
            className="px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition"
          >
            lowercase
          </button>
          <button
            onClick={toTitleCase}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition"
          >
            Title Case
          </button>
          <button
            onClick={toSentenceCase}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
          >
            Sentence case
          </button>
          <button
            onClick={toggleCase}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition"
          >
            tOGGLE cASE
          </button>
          <button
            onClick={() => setText('')}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold shadow hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
