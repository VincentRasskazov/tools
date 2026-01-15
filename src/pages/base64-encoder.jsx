import { useState } from 'react';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => {
    try {
      setOutput(btoa(input));
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-lime-100 to-green-200">
      <h2 className="text-4xl font-extrabold mb-6 text-lime-700 drop-shadow">Base64 Encoder</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode..."
          className="w-full px-4 py-2 border-2 border-lime-300 rounded-lg focus:outline-none focus:border-lime-500 h-32 mb-4 resize-none"
        />
        <button
          onClick={encode}
          className="w-full px-6 py-2 rounded-lg bg-lime-500 text-white font-semibold shadow hover:bg-lime-600 transition mb-4"
        >
          Encode to Base64
        </button>
        <textarea
          value={output}
          readOnly
          placeholder="Encoded result..."
          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg h-32 font-mono text-sm resize-none"
        />
      </div>
    </div>
  );
}
