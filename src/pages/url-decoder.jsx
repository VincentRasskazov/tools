import { useState } from 'react';

export default function URLDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('Error: Invalid URL encoding');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 drop-shadow">URL Decoder</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter encoded URL to decode..."
          className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 h-32 mb-4 font-mono text-sm resize-none"
        />
        <button
          onClick={decode}
          className="w-full px-6 py-2 rounded-lg bg-indigo-500 text-white font-semibold shadow hover:bg-indigo-600 transition mb-4"
        >
          Decode URL
        </button>
        <textarea
          value={output}
          readOnly
          placeholder="Decoded result..."
          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg h-32 resize-none"
        />
      </div>
    </div>
  );
}
