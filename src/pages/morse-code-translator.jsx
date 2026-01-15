import { useState } from 'react';

const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

export default function MorseCodeTranslator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const encode = () => {
    const result = input.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
    setOutput(result);
  };

  const decode = () => {
    const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));
    const result = input.split(' ').map(code => reverseMorse[code] || '').join('');
    setOutput(result);
  };

  const translate = () => {
    mode === 'encode' ? encode() : decode();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200">
      <h2 className="text-4xl font-extrabold mb-6 text-amber-700 drop-shadow">Morse Code Translator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${mode === 'encode' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Text to Morse
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${mode === 'decode' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Morse to Text
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text...' : 'Enter morse code (use spaces)...'}
          className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 h-32 mb-4 resize-none"
        />
        <button
          onClick={translate}
          className="w-full px-6 py-2 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition mb-4"
        >
          Translate
        </button>
        <textarea
          value={output}
          readOnly
          placeholder="Result..."
          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg h-32 font-mono resize-none"
        />
      </div>
    </div>
  );
}
