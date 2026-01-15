import { useState } from 'react';

export default function BinaryTranslator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const encode = () => {
    const result = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    setOutput(result);
  };

  const decode = () => {
    try {
      const result = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      setOutput(result);
    } catch {
      setOutput('Error: Invalid binary');
    }
  };

  const translate = () => {
    mode === 'encode' ? encode() : decode();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-cyan-200">
      <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow">Binary Translator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${mode === 'encode' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Text to Binary
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${mode === 'decode' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Binary to Text
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text...' : 'Enter binary (space-separated)...'}
          className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 h-32 mb-4 resize-none"
        />
        <button
          onClick={translate}
          className="w-full px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition mb-4"
        >
          Translate
        </button>
        <textarea
          value={output}
          readOnly
          placeholder="Result..."
          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg h-32 font-mono text-sm resize-none"
        />
      </div>
    </div>
  );
}
