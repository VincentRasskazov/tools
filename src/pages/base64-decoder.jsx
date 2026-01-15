import { useState } from 'react';

export default function Base64Decoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const decode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      setOutput('Error: Invalid Base64 string');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 to-teal-200">
      <h2 className="text-4xl font-extrabold mb-6 text-emerald-700 drop-shadow">Base64 Decoder</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Base64 to decode..."
          className="w-full px-4 py-2 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 h-32 mb-4 font-mono text-sm resize-none"
        />
        <button
          onClick={decode}
          className="w-full px-6 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600 transition mb-4"
        >
          Decode from Base64
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
